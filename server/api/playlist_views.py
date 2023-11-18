from api.models import Track, Artist, Genre, UserRating, User, Playlist
from django.http import JsonResponse
from api.serializer import TrackSerializer, ArtistSerializer, UserSerializer, PlaylistSerializer
from api.utils.get_token import get_token
from api.utils.decode_jwt import decode_jwt
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
import json


@api_view(['POST'])
def create_playlist(request):
    try:
        data = request.data

        token = get_token(request.headers['Authorization'])
        user_id = decode_jwt(token)
        user = User.objects.get(pk=user_id)

        playlist = Playlist.objects.create(
            user=user, playlist_name=data['playlist_name'])

        # track_id = request.data['track_id']
        # song = Track.objects.get(pk=track_id)

        # playlist.tracks.add(song)

        return JsonResponse({'success': 'Playlist created successfully'}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User, song, or playlist not found'}, status=404)


@api_view(['POST'])
def add_song_to_playlist(request):
    try:
        data = request.data

        playlist = Playlist.objects.get(pk=data['playlist_id'])
        song = Track.objects.get(pk=data['track_id'])

        playlist.tracks.add(song)

        return JsonResponse({'success': 'Song added to the playlist successfully'}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist or song not found'}, status=404)


@api_view(['POST'])
def remove_song_from_playlist(request):
    try:
        data = request.data

        playlist = Playlist.objects.get(pk=data['playlist_id'])
        song = Track.objects.get(pk=data['track_id'])

        playlist.tracks.remove(song)

        return JsonResponse({'success': 'Song removed from the playlist successfully'}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist or song not found'}, status=404)


@api_view(['GET'])
def get_user_playlists(request):
    try:
        token = get_token(request.headers['Authorization'])
        user_id = decode_jwt(token)
        user = User.objects.get(pk=user_id)

        user_playlists = Playlist.objects.filter(user=user)

        serialized_playlists = []
        for playlist in user_playlists:
            serialized_playlist = PlaylistSerializer(playlist).data

            # Include details about tracks in the playlist
            serialized_playlist['tracks'] = TrackSerializer(
                playlist.tracks.all(), many=True).data

            serialized_playlists.append(serialized_playlist)

        return JsonResponse({'status': 'success', 'playlists': serialized_playlists}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


@api_view(['DELETE'])
def delete_playlist(request, playlist_id):
    try:
        token = get_token(request.headers['Authorization'])
        user_id = decode_jwt(token)
        user = User.objects.get(pk=user_id)

        playlist = Playlist.objects.get(pk=playlist_id)

        if playlist.user == user:
            playlist.delete()
            return JsonResponse({'success': 'Playlist deleted successfully'})

        return JsonResponse({'status': '403', 'error': 'Unauthorized access to delete playlist'}, status=403)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User or playlist not found'}, status=404)


@api_view(['GET'])
def get_playlist_details(request, playlist_id):
    try:
        # Retrieve the playlist using the provided playlist_id
        playlist = Playlist.objects.get(pk=playlist_id)

        # Serialize the playlist data with details about tracks and albums
        serialized_playlist = PlaylistSerializer(playlist).data

        # Include details about tracks in the playlist
        # serialized_playlist['tracks'] = TrackSerializer(
        #     playlist.tracks.all(), many=True).data

        # print(json.dumps(
        #     {'data': playlist.tracks.values_list('album', flat=True).all()}))

        # # Include details about albums in the playlist (assuming each track has an associated album)
        # serialized_playlist['albums'] = AlbumSerializer(
        #     playlist.tracks.values_list('album', flat=True).distinct(), many=True).data

        # Return the serialized data as JSON
        return JsonResponse({'playlist': serialized_playlist})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Playlist not found'}, status=404)
