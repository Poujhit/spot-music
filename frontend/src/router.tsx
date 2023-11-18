import { createBrowserRouter } from 'react-router-dom';
import AlbumPage from 'views/album/AlbumPage';
import ArtistPage from 'views/artist/ArtistPage';
import AuthPage from 'views/auth/AuthPage';
import HomePage from 'views/home/HomePage';
import Layout from 'views/layout/Layout';
import MyPlaylistPage from 'views/myPlaylists/MyPlaylists';
import PlayListPage from 'views/playlist/PlayListPage';
import SearchPage from 'views/search/SearchPage';
import SongPage from 'views/song/SongPage';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <AuthPage />,
    },
    {
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/search",
                element: <SearchPage />,
            },

            {
                path: "/artist/:artistId",
                element: <ArtistPage />,
            },
            {
                path: "/album/:albumId",
                element: <AlbumPage />,
            },
            {
                path: "/song/:songId",
                element: <SongPage />,
            },
            {
                path: "/my-playlists",
                element: <MyPlaylistPage />,
            },
            {
                path: "/playlist/:playlistId",
                element: <PlayListPage />,
            },

        ]
    }
]);

export default router;
