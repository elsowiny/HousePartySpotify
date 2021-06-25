from django.views.generic import TemplateView
from django.urls import path
from .views import index
urlpatterns = [
  
    path('', index),
#    path('farse', TemplateView.as_view(template_name='index.html'))
]
