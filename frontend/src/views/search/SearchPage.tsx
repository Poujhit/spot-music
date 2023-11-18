/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ImageList, TextField, Typography, debounce } from "@mui/material";
import AlbumCard from "components/AlbumCard";
import ArtistCard from "components/ArtistCard";
import SongCard from "components/SongCard";
import React, { useEffect, useState } from "react";
import customAxios from "utils/customAxios";

interface SearchPageProps { }

const SearchPage: React.FC<SearchPageProps> = () => {
    const [searchText, setSearchText] = useState("");
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);

    const handleSearch = () => {
        return debounce((e) => {
            setSearchText(e.target.value);
        }, 500);
    };

    useEffect(() => {
        console.log(searchText);
        customAxios
            .get(`search-songs/${searchText}/`)
            .then((res) => setSongs(res.data?.songs))
            .catch((err) => console.log(err));

        customAxios
            .get(`search-albums/${searchText}/`)
            .then((res) => setAlbums(res.data?.albums))
            .catch((err) => console.log(err));

        customAxios
            .get(`search-artists/${searchText}/`)
            .then((res) => setArtists(res.data?.artists))
            .catch((err) => console.log(err));
    }, [searchText]);

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    m: 2,
                }}
            >
                <TextField
                    label="Search"
                    name="search"
                    onChange={handleSearch()}
                    variant="filled"
                    autoComplete="off"
                />
            </Box>

            {songs.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Songs
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {songs?.map((song: any) => (
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

            {albums.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Albums
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {albums?.map((album: any) => (
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

            {artists.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                        Artists
                    </Typography>

                    <ImageList
                        sx={{
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                                "repeat(auto-fill,minmax(250px,1fr)) !important",
                            gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                    >
                        {artists?.map((artist: any) => (
                            <ArtistCard
                                id={artist.id}
                                name={artist.artist_name}

                                imageUrl={artist.image_url}
                            />
                        ))}
                    </ImageList>
                </>
            )}
        </Box>
    );
};
export default SearchPage;
