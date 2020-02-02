from django.http import HttpResponse, JsonResponse, FileResponse, StreamingHttpResponse
from wsgiref.util import FileWrapper
from os.path import isdir, isfile, join, exists, splitext, normpath, sep
from app.utils.parser import *
from app.utils.helper import *
from app.config.config import *
from multiprocessing import Pool
import json
import uuid
import re
import os
import mimetypes

pool = Pool(processes=8)


# For AJAX request to initialize the data on the server side
def init(request):
    res = {}

    if request.method != "POST":
        res['code'] = 405
        res['message'] = "Method not allowed"
        return JsonResponse(res, status=405)
    else:
        try:
            req = json.loads(request.body.decode("utf-8"))

            current_search = req.get('current_search')
            token = req.get('token')
            if current_search == None or token == None:
                raise Exception("Invalid POST data")
        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        try:
            request.session[token] = {}

            if isdir(current_search):
                request.session[token]['path_list'] = getPathContent(current_search, pool)
                mode = "directory"
            elif isfile(current_search):
                extension = current_search.split(".")[-1].lower()
                
                if extension in image_formats:
                    request.session[token]['path_list'] = [map_dir2dict(current_search)]
                    mode = "image"

                elif extension == "list":
                    request.session[token]['path_list'] = parseList(current_search, pool)
                    mode = "list"
                
                elif extension == "tsv":
                    request.session[token]['path_list'] = parseTSV(current_search, pool)
                    mode = "tsv"
                
                elif extension == "detn":
                    request.session[token]['path_list'] = parseList(current_search, pool, map_fn=map_yituanno2dict)
                    mode = "detection"
        except Exception as e:
            res['code'] = 500
            res['message'] = "Internal server error, failed to parse the search results"
            return JsonResponse(res, status=500)
        
        try:
            total_pages = get_total_pages(request.session[token]['path_list'])
        except Exception as e:
            res['code'] = 500
            res['message']  = "Error occured when calculating the total number of pages"
            return JsonResponse(res, status=500)
        
        res['code'] = 200
        res['message'] = "Successfully initialized session data"
        norm_path = normpath(current_search)

        data = {
                "total_page": total_pages,
                "mode": mode,
                "current_search": norm_path
                }
        res['data'] = data
        return JsonResponse(res, status=200)


# For AJAX request to get the items on the page
def get_page(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            page_number = req.get('page_number')
            current_search = req.get('current_search')
            token = req.get('token')
            filtered = req.get('filtered')

            if (page_number == None or current_search == None or \
                token == None or filtered == None):
                raise Exception("Invalid POST data")

        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        if token not in request.session:
            res['code'] = 500
            res['message'] = "Session is not found"
            return HttpResponse(status=500)

        try:
            if filtered:
                data = request.session[token]['filtered_path_list'][(page_number-1)*MAX_ITEM_PER_PAGE: page_number*MAX_ITEM_PER_PAGE]
            else:
                data = request.session[token]['path_list'][(page_number-1)*MAX_ITEM_PER_PAGE: page_number*MAX_ITEM_PER_PAGE]
            
            res['data'] = pool.map(get_img_for_page, data)
            return JsonResponse(res, status=200)
        except Exception as e:            
            res['code'] = 500
            res['message'] = "Failed to fetch the data from session"
            return JsonResponse(res, status=500)


# for AJAX request to get original images
def get_original_image(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            img_path = req.get('path')
            img_type = req.get('type')
            print(img_type)
            if img_path == None or img_type == None:
                raise Exception("Invalid POST data")

        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        if not exists(img_path):
            res['code'] = 404
            res['message'] = "Image not found"
            return JsonResponse(res, status=404)
        
        try:
            if img_type == 'detection':
                img_data = get_single_image_with_detection_annotation(img_path, original=True)
            else:
                img_data = get_single_image(img_path, original=True)
            res['code'] = 200
            res['message'] = "Image loaded successfully"
            res['data'] = img_data
            return JsonResponse(res, status=200)
        except:
            res['code'] = 500
            res['message'] = "Failed to load the image"
            return JsonResponse(res, status=500)


# for AJAX request to filter the data
def filter_by_keyword(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            current_search = req.get('current_search')
            keyword = req.get('keyword')
            token = req.get('token')
           
            if current_search == None or keyword == None or token == None:
                raise Exception("Invalid POST data")
        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        def filter_by_keyword(path_list_item):
            if keyword.lower() in path_list_item['basename'].lower():
                return True
            else:
                return False
        
        if token not in request.session:
            res['code'] = 404
            res['message'] = "Session not found"
            return JsonResponse(res, status=404)

        try:
            path_list = list(filter(filter_by_keyword, request.session[token]['path_list']))
            request.session[token]['filtered_path_list'] = path_list
            request.session.save()
            total_page = math.ceil(len(path_list)/MAX_ITEM_PER_PAGE)
            data = {
                "total_page": total_page,
            }
            res['data'] = data
            return JsonResponse(res, status=200)

        except Exception as e:
            res['code'] = 500
            res['message'] = "Failed to filter the data"
            return JsonResponse(res, status=500)


# for AJAX request to obtain stats
def get_stats(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            token = req.get('token')
            filtered = req.get('filtered')
           
            if token == None or filtered == None:
                raise Exception("Invalid POST data")
        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)

        if token not in request.session:
            res['code'] = 404
            res['message'] = "Session not found"
            return JsonResponse(res, status=404)
        
        try:
            if filtered:
                imgs = list(filter(filter_imgs, request.session[token]['filtered_path_list']))
            else:
                imgs = list(filter(filter_imgs, request.session[token]['path_list']))
            
            count = len(imgs)
            formats = pool.map(map2format, imgs)
            labels = pool.map(map2label, imgs)
            data = {
                "count": count,
                "formats":  formats,
                "labels": labels
            }
            res['code'] = 200
            res['message'] = "Successfully obtained the statistics"
            res['data'] = data
            return JsonResponse(res, status=200)

        except Exception as e:
            res['code'] = 500
            res['message'] = "Failed to filter the data"
            return JsonResponse(res, status=500)


# for AJAX request to get download id
def get_download_id(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            file_path = req.get('file_path')

            if file_path == None:
                raise Exception("Invalid POST data")
        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        if not isfile(file_path):
            res['code'] = 404
            res['message'] = "File not found"
            return JsonResponse(res, status=404)
        else:
            if 'download' not in request.session.keys():
                request.session['download'] = {}
            file_id = str(uuid.uuid4())
            request.session['download'][file_id] = file_path
            request.session.save()
            res['code'] = 200
            res['message'] = "download id is generated"
            res['data'] = file_id
            return JsonResponse(res, status=200)


# for HTTP request to download a file
def download_file(request, download_id):
    file_path = request.session['download'][download_id]
    file_name = basename(file_path)
    response = FileResponse(open(file_path, 'rb'))
    response['content_type'] = "application/octet-stream"
    response['Content-Disposition'] = 'attachment; filename={}'.format(file_name)
    return response


# for request 
class RangeFileWrapper(object):
    def __init__(self, filelike, blksize=8192, offset=0, length=None):
        self.filelike = filelike
        self.filelike.seek(offset, os.SEEK_SET)
        self.remaining = length
        self.blksize = blksize

    def close(self):
        if hasattr(self.filelike, 'close'):
            self.filelike.close()

    def __iter__(self):
        return self

    def __next__(self):
        if self.remaining is None:
            # If remaining is None, we're reading the entire file.
            data = self.filelike.read(self.blksize)
            if data:
                return data
            raise StopIteration()
        else:
            if self.remaining <= 0:
                raise StopIteration()
            data = self.filelike.read(min(self.remaining, self.blksize))
            if not data:
                raise StopIteration()
            self.remaining -= len(data)
            return data

def get_video_id(request):
    if request.method != "POST":
        return HttpResponse(status=400)
    else:
        res = {}

        try:
            req = json.loads(request.body.decode("utf-8"))
            video_path = req.get('video_path')

            if video_path == None:
                raise Exception("Invalid POST data")
        except Exception as e:
            res['code'] = 406
            res['message'] = "Not acceptable, POST data is incomplete"
            return JsonResponse(res, status=406)
        
        if not isfile(video_path):
            res['code'] = 404
            res['message'] = "Video not found"
            return JsonResponse(res, status=404)
        else:
            if 'video' not in request.session.keys():
                request.session['video'] = {}
            video_id = str(uuid.uuid4())
            request.session['video'][video_id] = video_path
            request.session.save()
            res['code'] = 200
            res['message'] = "Video id is generated"
            res['data'] = video_id
            return JsonResponse(res, status=200)


def stream_video(request, video_id):
    path = request.session["video"][video_id]

    range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)
    range_header = request.META.get('HTTP_RANGE', '').strip()
    range_match = range_re.match(range_header)
    size = os.path.getsize(path)
    content_type, encoding = mimetypes.guess_type(path)
    content_type = content_type or 'application/octet-stream'
    if range_match:
        first_byte, last_byte = range_match.groups()
        first_byte = int(first_byte) if first_byte else 0
        last_byte = int(last_byte) if last_byte else size - 1
        if last_byte >= size:
            last_byte = size - 1
        length = last_byte - first_byte + 1
        resp = StreamingHttpResponse(RangeFileWrapper(open(path, 'rb'), offset=first_byte, length=length), status=206, content_type=content_type)
        resp['Content-Length'] = str(length)
        resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
    else:
        resp = StreamingHttpResponse(FileWrapper(open(path, 'rb')), content_type=content_type)
        resp['Content-Length'] = str(size)
    resp['Accept-Ranges'] = 'bytes'
    return resp

# for AJAX request to get images with detection annotation