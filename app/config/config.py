THUMBNAIL_MAX_SIZE = (200, 200)
ROWS = 3
MAX_ITEM_PER_PAGE = ROWS * 6

version = 0.4
update_log = {
    "new_features": [
        "1. 支持下载图片",
        "2. 支持同一浏览器里多开",
        "3. 添加了用户手册",
        "4. 支持观看mp4视频",
        "5. 支持预览detection + attributes标注文件",
        "6. 支持更新通知"
    ],
    "optimization": [
        "1. 优化了系统架构",
        "2. 优化验证逻辑",
        "3. 更换了Django作为后端框架"
    ],
    "bug_fix": [
        "1. 修复了list文件里出现空白文件名的bug",
        "2. 修复了返回报错的bug"
    ]
}

# DO NOT CHANGE THE FOLLOWING
image_formats = ["jpg", "jpeg", "png", "tiff", "gif", "webp"]