from django.http import HttpResponse, FileResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views import View
from django.core.exceptions import ValidationError
from .models import Gallery
from django.core.files.storage import FileSystemStorage
import json, os, shutil, urllib.request, tempfile, zipfile
from os.path import basename
from wsgiref.util import FileWrapper
import magic,io,datetime
from zipfile import ZipFile, ZIP_DEFLATED
import pathlib
import js2py
from django.conf import settings
from .pdf import html2pdf
headers = {'content_type': 'application/json'}

# js2py.eval_js('console.log("Hello World!")')

class AddAlbum(View):
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

            for file in files:
                # image_folder = os.path.join(settings.MEDIA_ROOT, str(a.id))
                fs = FileSystemStorage(os.path.join(settings.MEDIA_ROOT, str(a.id)))
                file_name = fs.save(file.name, file)
 
        return redirect("/add/album/")

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
                # print(filename)
                image_files.append(filename)
                
            image_collection[element.id] = image_files
        # print(image_collection)
        context = {
        'album': all_images,'image_collection': image_collection,
    }
        return render(request, 'list_album.html', context=context)

class updateTitle(View):
    def post(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        print("hi")
        print(id)
        obj = Gallery.objects.get(id=id)
        obj.title = request.POST.get('title')

        
        saveData = Gallery(id = id,title=obj.title, )
        saveData.save()
        files = request.FILES.getlist('images')
        for file in files:
                fs = FileSystemStorage(os.path.join(settings.MEDIA_ROOT, str(id)))
                file_name = fs.save(file.name, file)
        return redirect("/list/album/")
    
class deleteImage(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        image_name = self.kwargs.get('name')
        # print(image_name)
            
        location = os.path.join(settings.MEDIA_ROOT)
  
# Path
        path = os.path.join(location,str(id),image_name)
        print(path)
        if os.path.exists(path):
            os.remove(path)
        else:
            print("The file does not exist")
        # os.remove(image_name)
        return redirect("/list/album/")
    
class deleteAlbum(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        Gallery.objects.get(id = id).delete()
        location = os.path.join(settings.MEDIA_ROOT)
        path = os.path.join(location,str(id))
        print(path)
        
        if os.path.exists(path):
            shutil.rmtree(path)
        else:
            print("The file does not exist!")
        return redirect("/list/album/")
    
class downloadAlbum1(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        location = os.path.join(settings.MEDIA_ROOT)
      
        path = os.path.join(location,str(id))
        directory_to_zip = path
        # zip_path = str(id)+'.zip'
        folder = pathlib.Path(path)
        print(path)
        temp = tempfile.TemporaryFile()
        archive = zipfile.ZipFile(temp, 'w', zipfile.ZIP_DEFLATED)
        for file in folder.iterdir():
            archive.write(file, arcname=file.name)
            print(f"Adding file: {file.name} as {file.name}")
      
        wrapper = FileWrapper(temp)
        response = HttpResponse(wrapper, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename=test.zip'
        return response
        
        # with ZipFile(zip_path, 'w', ZIP_DEFLATED) as zip:
        #     for file in folder.iterdir():
        #         zip.write(file, arcname=file.name)

        # img = open(str(id)+'.zip', 'rb')

        # response = FileResponse(img)
        # return FileResponse(img, as_attachment=True, filename="Export.zip")


# def send_file(response):

#     img = open('112.zip', 'rb')

#     response = FileResponse(img)

#     return FileResponse(img, as_attachment=True, filename="Export.zip")


# def export_pdf(request: object, context: object, template: object) -> object:
#     response = HttpResponse(content_type="application/pdf")
#     response["Content-Disposition"] = (
#         "inline; attachment; filename=identeq-face-"
#         + context["file_name"]
#         + str(datetime.datetime.now())
#         + ".pdf"
#     )
#     response["Content-Trasnfer-Encoding"] = "binary"
#     html_string = render_to_string(template, context=context)
#     html = HTML(string=html_string, base_url=request.build_absolute_uri())
#     result = html.write_pdf()


#     with tempfile.NamedTemporaryFile(delete=True) as output:
#         output.write(result)
#         output.flush()
#         output = open(output.name, "rb")
#         response.write(output.read())
#     return response

# def htmltopdf(request):
#     print("Hi")
#     return render(request,'pdf.html')
# def downloadpdf(request):
#     print("Hi")
#     pdf = html2pdf('downloadpdf.html')
#     return HttpResponse(pdf, content_type="application/pdf")

class downloadAlbum(View):
    def get(self, request, *args, **kwargs):
        id = self.kwargs.get('id')
        location = os.path.join(settings.MEDIA_ROOT)
      
        path = os.path.join(location,str(id))
        # directory_to_zip = path
        # zip_path = str(id)+'.zip'
        image_folder = pathlib.Path(path)

        # Create an in-memory byte stream to store the zip file
        zip_stream = io.BytesIO()

        # Create a ZipFile object with the in-memory byte stream
        with zipfile.ZipFile(zip_stream, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Loop through image files in the folder
            for root, _ , files in os.walk(image_folder):
                for file in files:
                    # if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                    image_path = os.path.join(root, file)
                    with open(image_path, 'rb') as image_file:
                        # Add image to the zip
                        zipf.writestr(file, image_file.read())
        album_name = Gallery.objects.filter(id=id)[0]
        # Set up the HttpResponse with appropriate headers
        response = HttpResponse(zip_stream.getvalue(), content_type='application/zip')
        response['Content-Disposition'] = f'attachment; filename="{album_name.title}.zip"'

        return response