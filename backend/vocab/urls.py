
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('accounts/login/', views.login_view, name='login'),

    path('colors/', views.colors, name='colors'),


    path('animals/', views.animals, name='animals'),

    path('add_to_vocab/<str:model_name>/<int:word_id>/', views.add_to_vocab, name='add_to_vocab'),
    path('my_vocab_list/', views.my_vocab_list, name='my_vocab_list'),
    path('delete_from_vocab/<str:model_name>/<int:word_id>/', views.delete_from_vocab, name='delete_from_vocab'),
    path('flashcard/<str:model_name>/', views.flashcard, name='flashcard'),

    path('login/', views.login_view, name='login-api'),
    path('logout/', views.logout_view, name='logout-api'),
    path('api/register/', views.RegisterAPIView.as_view(), name='register-api'),

    path('api/animals/', views.AnimalsAPIView.as_view(), name='animals-api'),
    path('api/colors/', views.ColorsAPIView.as_view(), name='colors-api'),

    path('api/add_to_vocab/<str:model_name>/<int:word_id>/', views.add_to_vocab_view, name='add_to_vocab-api'),
    path('api/my_vocab_list/', views.MyVocabListAPIView.as_view(), name='my_vocab_list-api'),

    path('api/flashcard/<str:model_name>/', views.FlashcardAPIView.as_view(), name='flashcard-api'),
]
