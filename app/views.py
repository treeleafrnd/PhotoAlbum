from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import View
from django.core.exceptions import ValidationError
from .models import Gallery
from django.core.files.storage import FileSystemStorage
import json, os
import magic
from django.conf import settings
headers = {'content_type': 'application/json'}

class AddTitleView(View):
    def get(self, request):
        return render(request, 'form.html',)
    
    def post(self, request):
        files = request.FILES.getlist('images')
        checker = True
        for file in files:
            if file.size > settings.UPLOAD_FILE_MAX_SIZE:
                checker = False
                return HttpResponse(json.dumps({'message': 'size {} larger than 2 MB'.format(file.size)}),
                                headers=headers, status=400)
            
            extension = file.name.split('.')[-1]
            if not extension or extension.lower() not in settings.WHITELISTED_IMAGE_TYPES.keys():
                checker = False
                return HttpResponse(json.dumps({'message': 'invalid image extension'}), headers=headers, status=400)
            content_type = file.content_type
            # print(content_type)
            if content_type not in settings.WHITELISTED_IMAGE_TYPES.values():
                checker = False
                return HttpResponse(json.dumps({'message': 'invalid image content-type'}), headers=headers, status=400)
            # check mime-type
            mime_type = magic.from_buffer(file.read(1024), mime=True)
            # print(mime_type)
            if mime_type not in settings.WHITELISTED_IMAGE_TYPES.values() and mime_type != content_type:
                checker = False
                return HttpResponse(json.dumps({'message': 'invalid image mime-type'}), headers=headers, status=400)
        query_dict = request.POST
        title = query_dict['title']  # Correct
        print(checker)
        new_album = Gallery(title=title)
        if checker == True:
            new_album.save()
            a = Gallery.objects.latest('id')
            print(a.id)
        


            for file in files:
                fs = FileSystemStorage(location='media/' + str(a.id))
                file_name = fs.save(file.name, file)
 
        return redirect("/home/")

#         return render(request, 'home.html',)

class Home(View):
    def get(self, request):
        return render(request, 'home.html')


class ListAlbum(View):
    def get(self, request):
        all_images = Gallery.objects.all()
        image_collection = {}
        for element in all_images:
            image_folder = os.path.join(settings.MEDIA_ROOT, str(element.id))  
            print(image_folder)
            image_files = []
            for filename in os.listdir(image_folder):
                image_files.append(os.path.join(settings.MEDIA_URL, str(element.id), filename))
            image_collection[element.id] = image_files
        print(image_collection)
        context = {
        'album': all_images,'image_collection': image_collection,
    }
        return render(request, 'list_album.html', context=context)

