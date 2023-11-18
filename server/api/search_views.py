from api.models import Track, Artist, Genre, UserRating, User, Playlist, Album
from django.http import JsonResponse
from api.serializer import TrackSerializer, ArtistSerializer, AlbumSerializer, PlaylistSerializer
from api.utils.get_token import get_token
from api.utils.decode_jwt import decode_jwt
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
import json


@api_view(['GET'])
def search_songs(request, search_text):
    # all songs which contains search text in its name or in its genre
    try:
        matching_songs = Track.objects.filter(track_title__icontains=search_text) | \
            Track.objects.filter(genre__genre_name__icontains=search_text)

        serialized_songs = TrackSerializer(matching_songs, many=True).data

        return JsonResponse({'songs': serialized_songs})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist not found'}, status=404)


@api_view(['GET'])
def search_artists(request, search_text):
    try:
        matching_artists = Artist.objects.filter(
            artist_name__icontains=search_text)

        serialized_artists = ArtistSerializer(matching_artists, many=True).data

        return JsonResponse({'artists': serialized_artists})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist not found'}, status=404)


@api_view(['GET'])
def search_albums(request, search_text):
    try:
        matching_albums = Album.objects.filter(album_title__icontains=search_text) | \
            Album.objects.filter(artists__artist_name__icontains=search_text)

        serialized_albums = AlbumSerializer(matching_albums, many=True).data

        return JsonResponse({'artists': serialized_albums})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist not found'}, status=404)
