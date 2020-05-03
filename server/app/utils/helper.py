from os.path import exists, dirname, abspath, join
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64
from app.config.config import *
from app.utils import annotation
import math

BASE_DIR = dirname(dirname(dirname(abspath(__file__))))

def get_single_image(path, original=True):
    
    if not exists(path):
        return {
            "encodedImage": None,
            "status": 404,
            "message" : "Image path not found",
            "size": None,
        }

    try:
        img = Image.open(path)
        extension = img.format
        
        if not original:
            img.thumbnail(THUMBNAIL_MAX_SIZE)

        buffered = BytesIO()
        img.save(buffered, format=extension)
        encoded_img = base64.b64encode(buffered.getvalue()).decode()
        size = img.size

        return {
            "encodedImage": encoded_img,
            "message": "success",
            "status": 200,
            "size": size
        }

    except Exception as e:
        return {
            "encodedImage": None,
            "status": 500,
            "message" : "Failed to load the image",
            "size": None
        }

def get_single_image_with_detection_annotation(path, original=True):
    if not exists(path):
        return {
            "encodedImage": None,
            "status": 404,
            "message" : "Image path not found",
            "size": None,
        }

    try:
        img_path, detections = annotation.detection(path)

        if img_path == None:
            raise Exception("Image path is not found")

        img = Image.open(img_path)
        extension = img.format
        draw = ImageDraw.Draw(img)
        font = ImageFont.truetype(join(BASE_DIR, 'static/font/helvetica.ttf'), 12)

        if detections != None:
            for det in detections:
                if det['shape'] == 'rectangleRoi':
                    draw.rectangle([det['box']['x'], det['box']['y'], det['box']['x']+det['box']['w'], \
                        det['box']['y']+det['box']['h']], outline="green")
                    text = ", ".join([ ",".join(v) for k, v in det['attributes'].items()])
                    draw.text((det['box']['x'], det['box']['y']), text, font=font, fill='red')
                elif det['shape'] == 'freehand':
                    vertex_num = len(det['vertex'])
                    for i in range(vertex_num):
                        start = (det['vertex'][i]['x'], det['vertex'][i]['y'])
                        end = (det['vertex'][(i+1)%vertex_num]['x'], det['vertex'][(i+1)%vertex_num]['y'])
                        line = [start, end]
                        draw.line(line, fill='green', width = 1)
                    if vertex_num > 0:
                        text = ", ".join([ ",".join(v) for k, v in det['attributes'].items()])
                        draw.text((det['vertex'][0]['x'], det['vertex'][0]['y']), text, font=font, fill='red')
        else:
            draw.text((0,0), "No annotations or failed to load annotations")
              
        if not original:
            img.thumbnail(THUMBNAIL_MAX_SIZE)

        buffered = BytesIO()
        img.save(buffered, format=extension)
        encoded_img = base64.b64encode(buffered.getvalue()).decode()
        size = img.size

        return {
            "encodedImage": encoded_img,
            "message": "success",
            "status": 200,
            "size": size
        }

    except Exception as e:
        return {
            "encodedImage": None,
            "status": 500,
            "message" : "Failed to load the image",
            "size": None
        }

def get_img_for_page(page_item):
    if page_item['type'] == "image":
        page_item['image'] = get_single_image(page_item['path'], original=False)
    elif page_item['type'] == "detection":
        page_item['image'] = get_single_image_with_detection_annotation(page_item['path'], original=False)
    return page_item

def filter_imgs(path_list_item):
    if path_list_item['type'] == "image":
        return True
    else:
        return False

def map2format(path_list_item):
    extension = path_list_item['basename'].split(".")[-1]
    return extension

def map2label(path_list_item):
    label = path_list_item['label']
    return label

def get_total_pages(lst:list):
    return math.ceil(len(lst) / MAX_ITEM_PER_PAGE)