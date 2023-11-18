import jwt
from django.http import JsonResponse


# returns user id
def decode_jwt(jwt_token):
    try:
        payload = jwt.decode(jwt_token, 'secret', algorithms="HS256")
        return payload['userId']
    except jwt.ExpiredSignatureError:
        return JsonResponse({'error': 'Token expired'}, status=403)
