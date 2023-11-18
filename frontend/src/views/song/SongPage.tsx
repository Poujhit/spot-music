/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import SongCard from "components/SongCard";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAxios from "utils/customAxios";

interface SongPageProps { }

const SongPage: React.FC<SongPageProps> = () => {
    const { songId } = useParams();
    const [song, setSong] = useState<Record<string, any>>({});

    useEffect(() => {
        customAxios
            .get(`song-detail/${songId}/`)
            .then((res) => setSong(res.data?.song))
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
                <SongCard
                    notClickable={true}
                    id={song.id}
                    songName={song.track_title}
                    artistNames={song.artists
                        ?.map((artist: any) => artist.artist_name)
                        .join(", ")}
                    imageUrl={song.track_image_url}
                />
            </Box>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Player
            </Typography>

            <Box
                sx={{
                    m: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <audio src={song?.audio_url} controls />
            </Box>
        </Box>
    );
};
export default SongPage;