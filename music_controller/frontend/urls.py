from django.views.generic import TemplateView
from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
  
    path('', index, name=''),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
#    path('example', TemplateView.as_view(template_name='index.html'))
]
