from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from api.serializer import RegisterDataSerializer, UserDetailsSerializer
from django.contrib.auth.hashers import make_password, check_password
import json
import jwt
from api.models import User
from datetime import datetime, timedelta
from api.utils.errors_from_serailiser import errors_from_serialiser


from rest_framework.decorators import api_view


@api_view(['POST'])
def RegisterUser(request):
    serializer = RegisterDataSerializer(data=request.data)
    if not serializer.is_valid():
        return JsonResponse({'status': 400, 'message': 'Missing fields'}, status=400)

    data = serializer.data
    password_hash = make_password(data['password'])

    user_data = {
        'email': data['email'],
        'password': password_hash,
        'username': data['username']
    }

    user_serializer = UserDetailsSerializer(data=user_data)
    if user_serializer.is_valid():
        user_serializer.save()
        return JsonResponse({'status': 200, 'message': 'User created'}, status=200)

    errors = {}
    for field_name, field_errors in user_serializer.errors.items():
        errors[field_name] = field_errors[0]
    errors['status'] = 400

    return JsonResponse(errors_from_serialiser(user_serializer), status=400)


@api_view(['POST'])
def Login(request):
    data = request.data
    if ('email' not in data or 'password' not in data):
        return JsonResponse({'status': 400, 'message': 'Missing fields'}, status=400)
    try:
        user = User.objects.get(email=data['email'])
        print(user.password, data['password'])
        valid_password = check_password(data['password'], user.password)
        print(valid_password)
        if not valid_password:
            return JsonResponse({'status': 400, 'message': 'Wrong credentials'}, status=400)

        token = jwt.encode({"userId": user.id, 'exp': datetime.now(
        ) + timedelta(hours=24)}, "secret", algorithm="HS256")

        return JsonResponse({'status': 200, 'token': token}, status=200)

    except User.DoesNotExist:
        return JsonResponse({'status': 400, 'message': 'user does not exist'}, status=400)
