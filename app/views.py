from django.shortcuts import render
from app.forms import SearchForm
from os.path import isdir, isfile
from uuid import uuid4
# for page rendering

def home(request):
    return render(request, "home.html")

def viewer(request):
    context = {}
    if request.method != "POST":
        context['code'] = 405
        context['msg'] = "Method not allowed"
        return render(request, "failure.html", context)
    else:
        form = SearchForm(request.POST)

        if form.is_valid():
            search_path = form.cleaned_data['search_query'].strip()
            if isdir(search_path) or isfile(search_path):
                context['search_path'] = search_path
                return render(request, "viewer.html", context)
            else:
                context['code'] = 400
                context['msg'] = "Bad request, invalid search query for directory or file path"
                return render(request, "failure.html", context)
        else:
            context['code'] = 406
            context['msg'] = "Not acceptable, invalid form data"
            return render(request, "failure.html", context)

def video_page(request):
    return  render(request, "video.html")