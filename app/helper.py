from os.path import exists
from PIL import Image
from io import BytesIO
import base64
from app.config import *
import math

def getSingleImage(path, original=True):
    
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

def get_img_for_page(page_item):
    if page_item['type'] == "image":
        page_item['image'] = getSingleImage(page_item['path'], original=False)
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