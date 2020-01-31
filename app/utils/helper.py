from os.path import exists
from PIL import Image, ImageDraw
from io import BytesIO
import base64
from app.config.config import *
from app.utils import annotation
import math


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

def get_single_image_with_yitu_annotation(path, original=True):
    if not exists(path):
        return {
            "encodedImage": None,
            "status": 404,
            "message" : "Image path not found",
            "size": None,
        }

    try:
        img_path, detections = annotation.yitu_detection(path)

        if img_path == None:
            raise Exception("Image path is not found")

        img = Image.open(img_path)
        extension = img.format
        draw = ImageDraw.Draw(img)

        if detections == None:
            for det in detections:
                draw.rectangle([det['box']['x'], det['box']['y'], det['box']['x']+det['box']['w'], det['box']['y']+det['box']['h']], outline="green")
                text = ", ".join([ ",".join(v) for k, v in det['attributes'].items()])
                draw.text((det['box']['x'], det['box']['y']), text)
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
    elif page_item['type'] == "yitu_annotation":
        page_item['image'] = get_single_image_with_yitu_annotation(page_item['path'], original=False)
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