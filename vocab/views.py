from django.shortcuts import render, redirect, get_object_or_404
from .models import Colors, UserVocabulary, Animals
from django.db.models import Q

def get_user_vocabulary_words(user):
    if user.is_authenticated:
        user_vocabulary, created = UserVocabulary.objects.get_or_create(user=user)
        return list(user_vocabulary.colors.all()) + list(user_vocabulary.animals.all())
    else:
        return []

def colors(request):
    vocabulary_items = Colors.objects.all()

    user_vocabulary_words = get_user_vocabulary_words(request.user)
    return render(request, 'vocab/colors.html', {'vocabulary_items': vocabulary_items, 'user_vocabulary_words': user_vocabulary_words})

def animals(request):
    vocabulary_items = Animals.objects.all()

    user_vocabulary_words = get_user_vocabulary_words(request.user)
    return render(request, 'vocab/animals.html', {'vocabulary_items': vocabulary_items, 'user_vocabulary_words': user_vocabulary_words})


def index(request):
    return render(request, 'index.html')

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
