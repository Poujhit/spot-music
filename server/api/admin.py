from django.contrib import admin

from api.models import User, Album, Artist, Genre, Playlist, Track, UserRating

# Register your models here.

admin.site.register(User)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(Genre)
admin.site.register(Playlist)
admin.site.register(Track)
admin.site.register(UserRating)
