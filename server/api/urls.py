from django.urls import path
from . import authentication_views, views, playlist_views, search_views


urlpatterns = [
    path('register/', authentication_views.RegisterUser),
    path('login/', authentication_views.Login),
    path('songs-by-genre/<str:genre_name>/',
         views.songs_by_genre, name='get-songs-by-genre'),
    path('song-detail/<int:track_id>/',
         views.song_detail, name='get-song-detail'),
    path('artist-detail/<int:artist_id>/',
         views.artist_detail, name='get-artist-detail'),
    path('songs-by-genre-id/<int:genre_id>/',
         views.songs_by_genre_id, name='get-songs-by-genre-id'),
    path('save-user-rating/', views.save_user_rating, name='save-user-rating'),
    path('album/<int:album_id>/',
         views.get_songs_in_album, name='get-songs-in-album'),
    path('get-albums/', views.get_random_albums, name='get-albums'),
    path('get-songs/', views.get_random_songs, name='get-songs'),


    path('create-playlist/', playlist_views.create_playlist, name='create-playlist'),
    path('add-song-to-playlist/', playlist_views.add_song_to_playlist,
         name='add-song-to-playlist'),
    path('remove-song-from-playlist/', playlist_views.remove_song_from_playlist,
         name='remove-song-from-playlist'),
    path('user-playlists/', playlist_views.get_user_playlists,
         name='user-playlists'),
    path('delete-playlist/<int:playlist_id>/',
         playlist_views.delete_playlist, name='delete-playlist'),
    path('playlist/<int:playlist_id>/',
         playlist_views.get_playlist_details, name='get-playlist-details'),
    path('suggested-for-you/',
         playlist_views.suggested_for_you, name='suggested-for-you'),
    path('create-system-generated-playlist/',
         playlist_views.create_system_generated_playlist, name='create-system-generated-playlist'),
    path('get-system-generated-playlists/',
         playlist_views.get_system_generated_playlists, name='get-system-generated-playlists'),


    path('search-songs/<str:search_text>/',
         search_views.search_songs, name='search-songs'),
    path('search-artists/<str:search_text>/',
         search_views.search_artists, name='search-artists'),
    path('search-albums/<str:search_text>/',
         search_views.search_albums, name='search-albums'),

]
