from django.contrib import admin
from django.contrib.auth.views import LoginView
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),


    path('', include('vocab.urls')),  # Include the app's URLs

]
