"""OmniViewer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from app import views
from app import api

urlpatterns = [
    path("", views.home),
    path("home/", views.home),
    path("viewer/", views.viewer),
    path("api/init/", api.init),
    path("api/getPage/", api.get_page),
    path("api/getOriginalImage/", api.get_original_image),
    path("api/filterByKeyword/", api.filter_by_keyword),
    path("api/getStats/", api.get_stats),
    path("api/getDownloadId/", api.get_download_id),
    path("api/download/<download_id>", api.download_file),
    path("api/getVideoId/", api.get_video_id),
    path("api/video/<video_id>", api.stream_video),
    path("manual/", views.show_manual)
]
