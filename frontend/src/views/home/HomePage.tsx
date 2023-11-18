/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, ImageList } from "@mui/material";
import SongCard from "components/SongCard";
import React from "react";
import { useQueries } from "@tanstack/react-query";
import customAxios from "utils/customAxios";
import AlbumCard from "components/AlbumCard";
import PlayListCard from "components/PlayListCard";

interface HomePageProps { }

const HomePage: React.FC<HomePageProps> = () => {
    const queryResults = useQueries({
        queries: [
            {
                queryKey: ["suggested-for-you"],
                queryFn: () =>
                    customAxios.get("suggested-for-you/").then((res) => res.data),
            },
            {
                queryKey: ["songs-by-genre-electronic"],
                queryFn: () =>
                    customAxios.get("songs-by-genre/electronic/").then((res) => res.data),
            },
            {
                queryKey: ["get-random-albums"],
                queryFn: () => customAxios.get("get-albums/").then((res) => res.data),
            },
            {
                queryKey: ["get-random-songs"],
                queryFn: () => customAxios.get("get-songs/").then((res) => res.data),
            },
            {
                queryKey: ["system-generated-playlists"],
                queryFn: () =>
                    customAxios
                        .get("get-system-generated-playlists/")
                        .then((res) => res.data),
            },
        ],
    });

    if (queryResults.some((query) => query.isLoading)) return "loading...";

    const [
        suggestedForYou,
        songsByGenre,
        randomAlbums,
        randomSongs,
        systemGeneratedPlaylist,
    ] = queryResults;
    console.log(songsByGenre.data);

    return (
        <Box sx={{ padding: 3 }}>
            {suggestedForYou.data?.total > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Suggested For You
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {suggestedForYou.data?.suggested_songs?.map((song: any) => (
                            <SongCard
                                id={song.id}
                                songName={song.track_title}
                                artistNames={song.artists
                                    .map((artist: any) => artist.artist_name)
                                    .join(", ")}
                                imageUrl={song.track_image_url}
                            />
                        ))}
                    </ImageList>
                </>
            )}

            {songsByGenre.data?.songs?.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Electronic hits
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {songsByGenre.data?.songs?.map((song: any) => (
                            <SongCard
                                id={song.id}
                                songName={song.track_title}
                                artistNames={song.artists
                                    .map((artist: any) => artist.artist_name)
                                    .join(", ")}
                                imageUrl={song.track_image_url}
                            />
                        ))}
                    </ImageList>
                </>
            )}

            {randomAlbums.data?.albums?.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Some Albums For U
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {randomAlbums.data?.albums?.map((album: any) => (
                            <AlbumCard
                                id={album.id}
                                albumName={album.album_title}
                                artistNames={album.artists
                                    .map((artist: any) => artist.artist_name)
                                    .join(", ")}
                                imageUrl={album.cover_image_url}
                            />
                        ))}
                    </ImageList>
                </>
            )}

            {songsByGenre.data?.songs?.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Some Songs for U
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {randomSongs.data?.songs?.map((song: any) => (
                            <SongCard
                                id={song.id}
                                songName={song.track_title}
                                artistNames={song.artists
                                    .map((artist: any) => artist.artist_name)
                                    .join(", ")}
                                imageUrl={song.track_image_url}
                            />
                        ))}
                    </ImageList>
                </>
            )}

            {systemGeneratedPlaylist.data?.playlists?.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        PlayLists Generated by Spot Music
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {systemGeneratedPlaylist.data?.playlists?.map((playlist: any) => (
                            <PlayListCard
                                id={playlist.id}
                                name={playlist.playlist_name}
                                description={playlist.description}
                            />
                        ))}
                    </ImageList>
                </>
            )}
        </Box>
    );
};
export default HomePage;
