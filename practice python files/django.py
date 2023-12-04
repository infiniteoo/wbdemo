# pip install djangorestframework

# django-admin startproject myproject
# cd myproject
# python manage.py startapp myapp

# Define a Model in models.py (e.g., myapp/models.py):
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

# Create a Serializer in serializers.py (e.g., myapp/serializers.py):
from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

# Create a ViewSet in views.py (e.g., myapp/views.py):
from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


# Configure URLs in urls.py (e.g., myapp/urls.py):
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')

urlpatterns = [
    path('', include(router.urls)),
]

# Include the App URLs in the Project's urls.py (e.g., myproject/urls.py):
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
]


# Run the Development Server:
# python manage.py runserver

