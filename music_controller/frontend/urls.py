from django.views.generic import TemplateView
from django.urls import path
from .views import index
urlpatterns = [
  
    path('', index),
    path('join', index),
    path('create', index),
#    path('example', TemplateView.as_view(template_name='index.html'))
]
