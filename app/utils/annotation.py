import json

def yitu_detection(json_path):
    json_file = json.load(open(json_path, 'r'))

    if 'image_path' in json_file:
        img_path = json_file['image_path'][0].lstrip("image")
    else:
        img_path = None
    
    det = []
    if 'anno_result' in json_file:
        if 'object_info' in json_file['anno_result']:
            try:
                for anno in json_file['anno_result']['object_info']:
                    if anno['shape'] == 'rectangleRoi':
                        temp = {}
                        temp['box'] = {
                            "x": min(anno['handles']['start']['x'], anno['handles']['end']['x']),
                            "y": min(anno['handles']['start']['y'], anno['handles']['end']['y']),
                            "w": abs(anno['handles']['start']['x'] - anno['handles']['end']['x']),
                            "h": abs(anno['handles']['start']['y'] - anno['handles']['end']['y'])
                        }

                        temp['attributes'] = {}
                        
                        for attr in anno['attributes']:
                            temp['attributes'][attr['attr_name']] = attr['anno_value'] if 'anno_value' in attr else attr['default_value']
                        
                        det.append(temp)
            except Exception as e:
                traceback.print_exc()
                det = []
    
    return img_path, det