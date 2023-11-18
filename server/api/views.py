from api.models import Track, Artist, Genre, UserRating, User, Album
from django.http import JsonResponse
from api.serializer import TrackSerializer, ArtistSerializer, NewTrackSerializer
from api.utils.get_token import get_token
from api.utils.decode_jwt import decode_jwt
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
import random


# Create your views here.
@api_view(['GET'])
def songs_by_genre(request, genre_name):

    songs_in_genre = Track.objects.filter(genre__genre_name=genre_name)
    serialiser = TrackSerializer(songs_in_genre, many=True)

    return JsonResponse({'status': 200, 'songs': serialiser.data}, status=200)


@api_view(['GET'])  # read the function name like GET song_detail
def song_detail(request, track_id):
    token = get_token(request.headers['Authorization'])
    user_id = decode_jwt(token)

    try:
        user = User.objects.get(pk=user_id)
        song = Track.objects.get(pk=track_id)
        serialized_song = TrackSerializer(song).data
        # serialized_song['artists'] = [
        #     {'id': artist.id, 'artist_name': artist.artist_name} for artist in song.artists.all()]
        # serialized_song['album'] = {
        #     'id': song.album.id, 'album_title': song.album.album_title}
        # serialized_song['genre'] = {'id': song.genre.id,
        #                             'genre_name': song.genre.genre_name} if song.genre else 'nil'
        try:
            user_rating = UserRating.objects.get(user=user, track=song)
            rating = user_rating.rating
        except ObjectDoesNotExist:
            rating = None

        serialized_song['user_rating'] = rating

        return JsonResponse({'status': 200, 'song': serialized_song}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'status': 404, 'error': 'Song not found'}, status=404)


@api_view(['GET'])
def artist_detail(request, artist_id):
    try:
        artist = Artist.objects.get(pk=artist_id)
        serialized_artist = ArtistSerializer(artist).data

        tracks = TrackSerializer(Track.objects.filter(
            artists=artist), many=True).data
        random.shuffle(tracks)

        return JsonResponse({'status': 200, 'artist': serialized_artist, 'songs': tracks[:5]}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'status': 404, 'error': 'Artist not found'}, status=404)


@api_view(['GET'])
def songs_by_genre(request, genre_id):
    try:
        genre = Genre.objects.get(pk=genre_id)
        songs_in_genre = Track.objects.filter(genre=genre)
        serialized_songs = TrackSerializer(songs_in_genre, many=True).data

        # serialized_songs = []
        # for song in songs_in_genre:
        #     serialized_song = TrackSerializer(song).data
        #     serialized_song['artists'] = [{'id': artist.id, 'artist_name': artist.artist_name} for artist in song.artists.all()]
        #     serialized_song['album'] = {'id': song.album.id, 'album_title': song.album.album_title}
        #     serialized_song['genre'] = {'id': song.genre.id, 'genre_name': song.genre.genre_name} if song.genre else None
        #     serialized_songs.append(serialized_song)

        return JsonResponse({'status': 200, 'songs': serialized_songs}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'status': 404, 'error': 'Genre not found'}, status=404)


@api_view(['POST'])
def save_user_rating(request):
    try:
        token = get_token(request.headers['Authorization'])
        user_id = decode_jwt(token)
        data = request.data
        user = User.objects.get(pk=user_id)
        song = Track.objects.get(pk=data['track_id'])

        _, created = UserRating.objects.get_or_create(
            user=user, track=song, rating=data['rating'])

        if created:
            return JsonResponse({'status': 200, 'success': 'User rating saved successfully'}, status=200)

        return JsonResponse({'status': 400, 'error': 'User rating already exists'}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User or song not found'}, status=404)


@api_view(['GET'])
def get_songs_in_album(request, album_id):
    try:
        album = Album.objects.get(pk=album_id)

        songs_in_album = Track.objects.filter(album=album)

        serialized_songs = NewTrackSerializer(songs_in_album, many=True).data

        return JsonResponse({'songs': serialized_songs})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User or song not found'}, status=404)
