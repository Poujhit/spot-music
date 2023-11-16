from rest_framework import serializers
from api.models import User

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']

class RegisterDataSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False, max_length=255)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, allow_blank=False, max_length=255)
