import time
from os.path import join, isdir, isfile, exists, abspath, basename
from os import listdir
from app.config.config import *
import csv

def map_dir2dict(path, label=None):
    extension = path.split(".")[-1].lower()

    if isdir(path):
        file_type = "dir"
    elif extension in image_formats:
        file_type = "image"
    elif extension == "mp4":
        file_type = "video"
    else:
        file_type = "other"

    file_name = basename(path)
    return {
        "type" : file_type,
        "path" : path,
        "basename" : file_name,
        "label" : label
    }

def map_yituanno2dict(path):
    file_name = basename(path)

    return {
        "type": "yitu_annotation",
        "path": path,
        "basename": file_name,
        "label": None
    }


def getPathContent(path, multiprocessing_pool=None):
    if not exists(path):
        return None
    
    dir_list = listdir(path)
    dir_list = [abspath(join(path, f)) for f in dir_list if not f.startswith('.') and "\r" not in f]

    if multiprocessing_pool:
        dir_list = multiprocessing_pool.map(map_dir2dict, dir_list)
    else:
        dir_list = list(map(map_dir2dict, dir_list))

    dir_list.sort(key=lambda item : item['basename'])
    return dir_list
    
def parseTSV(tsv_file_path, multiprocessing_pool=None):
    with open(tsv_file_path, 'r') as f:
        reader = csv.reader(f, delimiter="\t")

        if multiprocessing_pool:
            dir_list = [line for line in reader]
            file_list = multiprocessing_pool.starmap(map_dir2dict, dir_list)
        else:
            file_list = [ map_dir2dict(*line) for line in reader]

        file_list.sort(key=lambda item : item['basename'])
        return file_list

def parseList(list_file_path, multiprocessing_pool=None):
    with open(list_file_path, 'r') as f:
        file_list = f.read().split("\n")

        if multiprocessing_pool:
            file_list = multiprocessing_pool.map(map_dir2dict, file_list)
        else:
            file_list = [ map_dir2dict(line) for line in file_list]

        file_list.sort(key=lambda item : item['basename'])
        return file_list

def parseYituDet(list_file_path, multiprocessing_pool=None):
    with open(list_file_path, 'r') as f:
        file_list = f.read().split("\n")

        if multiprocessing_pool:
            file_list = multiprocessing_pool.map(map_yituanno2dict, file_list)
        else:
            file_list = [map_yituanno2dict(line) for line in file_list]
        
        file_list.sort(key=lambda item : item['basename'])
        return file_list