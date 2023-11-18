/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import ArtistCard from "components/ArtistCard";
import SongsList from "components/SongsList";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customAxios from "utils/customAxios";

interface ArtistPageProps { }

const ArtistPage: React.FC<ArtistPageProps> = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState<Record<string, any>>({});

    useEffect(() => {
        customAxios
            .get(`artist-detail/${artistId}/`)
            .then((res) => setArtist(res.data))
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
                <ArtistCard
                    notClickable={true}
                    id={artist.artist?.id}
                    name={artist.artist?.artist_name}
                    imageUrl={artist.artist?.image_url}
                />
            </Box>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>Songs</Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>*only some songs are displayed for now</Typography>


            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',

            }}>

                <SongsList songs={artist.songs} />
            </Box>
        </Box>
    );
};
export default ArtistPage;
