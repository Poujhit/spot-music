from django.db import models
import random

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Artist(models.Model):
    artist_name = models.CharField(max_length=255, unique=True)
    image_url = models.URLField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.artist_name


class Genre(models.Model):
    genre_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.genre_name


class Album(models.Model):
    album_title = models.CharField(max_length=255)
    artists = models.ManyToManyField(Artist)
    release_date = models.DateField()
    cover_image_url = models.URLField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.album_title}"


class Track(models.Model):
    track_title = models.CharField(max_length=255)
    track_image_url = models.URLField(blank=False, null=False)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    artists = models.ManyToManyField(Artist)
    release_date = models.DateField()
    genre = models.ForeignKey(
        Genre, on_delete=models.SET_NULL, null=True, blank=False)
    audio_url = models.URLField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.track_title} - {', '.join(artist.artist_name for artist in self.artists.all())}"


class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    tracks = models.ManyToManyField(Track)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # System should be able to auto suggest songs to a user based on the songs that are present in their playlist.
    # Can match to a genre/album/artist
    # I can run this function for each of the user playlist,
    # get  5songs suggestions for each playlist,
    # remove the duplicates and send to user as suggested for you.
    # maxium 20 songs will be suggested for now.
    def suggest_songs(self, num_suggestions=5):
        playlist_tracks = self.tracks.all()

        genres = set(track.genre for track in playlist_tracks if track.genre)
        albums = set(track.album for track in playlist_tracks if track.album)
        artists = set(
            artist for track in playlist_tracks for artist in track.artists.all())

        suggested_songs = Track.objects.filter(
            models.Q(genre__in=genres) |
            models.Q(album__in=albums) |
            models.Q(artists__in=artists)
        ).exclude(id__in=[track.id for track in playlist_tracks]).distinct()

        shuffled_songs = list(suggested_songs)
        random.shuffle(shuffled_songs)

        return shuffled_songs[:num_suggestions]

    def __str__(self):
        return self.playlist_name


class UserRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # constraint to ensure that each user can rate each song only once
        unique_together = ('user', 'track')

    def __str__(self):
        return f"{self.user.username} rated {self.track.track_title} with {self.rating} stars"
