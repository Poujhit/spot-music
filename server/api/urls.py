from django.urls import path
from . import authentication_view

urlpatterns = [
    path('register/', authentication_view.RegisterUser),
    path('login/', authentication_view.Login),
]
