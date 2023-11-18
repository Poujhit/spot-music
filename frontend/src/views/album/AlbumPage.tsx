/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import AlbumCard from "components/AlbumCard";
import SongsList from "components/SongsList";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAxios from "utils/customAxios";

interface AlbumPageProps { }

const AlbumPage: React.FC<AlbumPageProps> = () => {
    const { albumId } = useParams();
    const [album, setAlbum] = useState<Record<string, any>>({});

    useEffect(() => {
        customAxios
            .get(`album/${albumId}/`)
            .then((res) => setAlbum(res.data?.album))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    m: 2,
                }}
            >
                <AlbumCard
                    notClickable={true}
                    id={album?.id}
                    albumName={album.album_title}
                    artistNames={album.artists
                        ?.map((artist: any) => artist.artist_name)
                        .join(", ")}
                    imageUrl={album.cover_image_url}
                />
            </Box>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Songs
            </Typography>


            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <SongsList songs={album?.songs} />
            </Box>
        </Box>
    );
};
export default AlbumPage;
