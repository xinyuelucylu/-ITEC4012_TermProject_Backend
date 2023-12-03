from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),

    path('colors/', views.colors, name='colors'),
    path('animals/', views.animals, name='animals'),

    path('add_to_vocab/<str:model_name>/<int:word_id>/', views.add_to_vocab, name='add_to_vocab'),
    path('my_vocab_list/', views.my_vocab_list, name='my_vocab_list'),
    path('delete_from_vocab/<str:model_name>/<int:word_id>/', views.delete_from_vocab, name='delete_from_vocab'),
    path('flashcard/<str:model_name>/', views.flashcard, name='flashcard'),
]
