from rest_framework import serializers
from .models import Colors, Animals, UserVocabulary

class ColorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colors
        fields = '__all__'

class AnimalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animals
        fields = '__all__'

class UserVocabularySerializer(serializers.Serializer):
    user_vocabulary_words = serializers.ListField(child=serializers.IntegerField(), default=[])
    animals = serializers.ListField(child=serializers.IntegerField(), default=[])
    colors = serializers.ListField(child=serializers.IntegerField(), default=[])