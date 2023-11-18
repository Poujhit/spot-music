from rest_framework import serializers
from api.models import User, Track, Album, Artist, Playlist, Genre, UserRating


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class RegisterDataSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True, allow_blank=False, max_length=255)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True, allow_blank=False, max_length=255)


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)

    class Meta:
        model = Album
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class TrackSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)
    genre = GenreSerializer()
    album = AlbumSerializer()

    class Meta:
        model = Track
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Playlist
        fields = '__all__'


class UserRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRating
        fields = '__all__'


# class NewPlaylistSerializer(serializers.ModelSerializer):
#     tracks = TrackSerializer(many=True, read_only=True)
#     albums = serializers.SerializerMethodField()

#     class Meta:
#         model = Playlist
#         fields = '__all__'

#     def get_albums(self, obj):
#         track_albums = obj.tracks.values(
#             'album__id', 'album__album_title', 'album__release_date', 'album__cover_image_url').distinct()
#         album_data = [{'id': album['album__id'],
#                        'album_title': album['album__album_title'], 'release_date': album['album__release_date'], 'cover_image_url': album['album__cover_image_url']} for album in track_albums]
#         print(album_data)
#         return AlbumSerializer(album_data, many=True).data


class NewTrackSerializer(serializers.ModelSerializer):
    artists = ArtistSerializer(many=True)
    genre = GenreSerializer()
    album = AlbumSerializer()

    class Meta:
        model = Track
        fields = '__all__'
