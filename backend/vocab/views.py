import json

from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


from .models import Colors, UserVocabulary, Animals
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserVocabularySerializer, AnimalsSerializer, ColorsSerializer
from django.views.decorators.csrf import csrf_protect, csrf_exempt


def index(request):
    return render(request, 'index.html')

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True})

@require_POST
@csrf_exempt
def login_view(request):
    request_json = json.loads(request.body)
    username = request_json.get('username')
    password = request_json.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # This will create a session for the user
        # And it will include a session cookie in the response, which React automatically forwards to the client
        login(request, user)
        return JsonResponse({"success": True, "username": user.username})
    else:
        return JsonResponse({"success": False}, status=401)

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log in the user after registration
            return redirect('index')  # Redirect to the home page after successful registration
    else:
        form = UserCreationForm()

    return render(request, 'registration/register.html', {'form': form})



def colors(request):
    vocabulary_items = Colors.objects.all()

    user_vocabulary_words = get_user_vocabulary_words(request.user)
    return render(request, 'vocab/colors.html', {'vocabulary_items': vocabulary_items, 'user_vocabulary_words': user_vocabulary_words})

def animals(request):
    vocabulary_items = Animals.objects.all()

    user_vocabulary_words = get_user_vocabulary_words(request.user)
    return render(request, 'vocab/animals.html', {'vocabulary_items': vocabulary_items, 'user_vocabulary_words': user_vocabulary_words})


def add_to_vocab(request, model_name, word_id):
    if model_name == 'colors':
        model = Colors
    elif model_name == 'animals':
        model = Animals


    word = get_object_or_404(model, id=word_id)

    if request.method == 'POST':
        user_vocabulary, created = UserVocabulary.objects.get_or_create(user=request.user)
        getattr(user_vocabulary, model_name).add(word)
        return redirect(model_name)

def get_user_vocabulary_words(user):
    if user.is_authenticated:
        user_vocabulary, created = UserVocabulary.objects.get_or_create(user=user)
        return list(user_vocabulary.colors.all()) + list(user_vocabulary.animals.all())
    else:
        return []

def my_vocab_list(request):
    user_vocabulary = UserVocabulary.objects.get(user=request.user)
    user_vocabulary_words = get_user_vocabulary_words(request.user)

    return render(request, 'my_vocab_list.html', {'user_vocabulary_words': user_vocabulary_words,
                                                  'animals':user_vocabulary.animals.all(),
                                                  'colors':user_vocabulary.colors.all()
                                                  })

def delete_from_vocab(request, model_name, word_id):
    if model_name == 'colors':
        model = Colors
    elif model_name == 'animals':
        model = Animals

    word = get_object_or_404(model, id=word_id)

    if request.user.is_authenticated:
        # Remove the selected word from the user's vocabulary list
        user_vocabulary = UserVocabulary.objects.get(user=request.user)
        getattr(user_vocabulary, model_name).remove(word)
    return redirect('my_vocab_list')

def flashcard(request, model_name):
    if model_name == 'colors':
        vocabulary_items = Colors.objects.all()
    elif model_name == 'animals':
        vocabulary_items = Animals.objects.all()
    else:
        vocabulary_items = get_user_vocabulary_words(request.user)
        # Handle the case where an invalid model_name is provided.
        # You can redirect the user to an error page or do something else.

    flash_words = list(vocabulary_items)


    # Render the 'flashcard.html' template and pass the necessary context.
    context = {
        'vocabulary_items': vocabulary_items,
        'flash_words': flash_words,
    }

    return render(request, 'flashcard.html', context)


class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        form = UserCreationForm(request.data)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


class ColorsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        vocabulary_items = Colors.objects.all()
        serializer = ColorsSerializer(vocabulary_items, many=True)
        return Response({'vocabulary_items': serializer.data, 'user_vocabulary_words': []})

    def post(self, request, model_name, word_id, *args, **kwargs):
        # Implement your add_to_vocab logic here
        return Response({'success': 'Word added to vocabulary'}, status=status.HTTP_201_CREATED)


class AnimalsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        vocabulary_items = Animals.objects.all()
        serializer = AnimalsSerializer(vocabulary_items, many=True)
        return Response({'vocabulary_items': serializer.data, 'user_vocabulary_words': []})

    def post(self, request, model_name, word_id, *args, **kwargs):
        # Implement your add_to_vocab logic here
        return Response({'success': 'Word added to vocabulary'}, status=status.HTTP_201_CREATED)

class FlashcardAPIView(APIView):
    def get(self, request, model_name):
        if model_name == 'colors':
            vocabulary_items = Colors.objects.all()
            serializer = ColorsSerializer(vocabulary_items, many=True)
        elif model_name == 'animals':
            vocabulary_items = Animals.objects.all()
            serializer = AnimalsSerializer(vocabulary_items, many=True)
        else:
            # Handle the case where an invalid model_name is provided.
            return Response({'error': 'Invalid model_name'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_vocab_view(request, model_name, word_id):
    if model_name == 'colors':
        model = Colors
    elif model_name == 'animals':
        model = Animals

    word = get_object_or_404(model, id=word_id)

    if request.method == 'POST':
        user_vocabulary, created = UserVocabulary.objects.get_or_create(user=request.user)
        getattr(user_vocabulary, model_name).add(word)
        serializer = UserVocabularySerializer({'user_vocabulary_words': get_user_vocabulary_words(request.user),
                                                'animals': user_vocabulary.animals.all(),
                                                'colors': user_vocabulary.colors.all()})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MyVocabListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_vocabulary = UserVocabulary.objects.get(user=request.user)
        user_vocabulary_words = get_user_vocabulary_words(request.user)

        serializer = UserVocabularySerializer({'user_vocabulary_words': user_vocabulary_words,
                                                'animals': user_vocabulary.animals.all(),
                                                'colors': user_vocabulary.colors.all()})
        return Response(serializer.data, status=status.HTTP_200_OK)
