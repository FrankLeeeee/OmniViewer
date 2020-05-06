THUMBNAIL_MAX_SIZE = (200, 200)
ROWS = 3
MAX_ITEM_PER_PAGE = ROWS * 6

version = 0.6
update_log = {
    "new_features": [
        "1. 重构了系统架构，前后端分离", "2. 用react+redux重构了前端", "3. 支持URL query params",
        "4. docker容器弹性化部署", "5. 支持方向键切换大图"
    ],
    "optimization": ["1. 优化前端逻辑", "2. 优化带宽使用", "3. 优化了通知模块"],
    "bug_fix": ['1. 修复了gunicorn超时问题']
}

# DO NOT CHANGE THE FOLLOWING
image_formats = ["jpg", "jpeg", "png", "tiff", "gif", "webp"]
