from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'app'

urlpatterns = [
    path('', views.Home.as_view(), name = 'home'),
    path('home/', views.Home.as_view(), name = 'home'),
    path('AddTitleView/', views.AddTitleView.as_view(), name = 'AddTitleView'),
    path('list/album', views.ListAlbum.as_view(), name = 'list'),
    path('update/title/<int:id>/',views.updateTitle.as_view(), name='update_title'),
    path('delete/album/<int:id>/',views.deleteAlbum.as_view(), name='delete_album'),
    path('download/album/<int:id>/',views.downloadAlbum.as_view(), name='download_album'),
    path('delete/image/<int:id>/<str:name>/',views.deleteImage.as_view(), name='delete_image'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)