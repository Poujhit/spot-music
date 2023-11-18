/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import PlayListCard from "components/PlayListCard";
import React, { useEffect, useState } from "react";
import customAxios from "utils/customAxios";

interface MyPlaylistsPageProps { }

const MyPlaylistsPage: React.FC<MyPlaylistsPageProps> = () => {
    const [playlists, setPlaylists] = useState<Record<string, any>>([]);

    useEffect(() => {
        customAxios
            .get(`user-playlists/`)
            .then((res) => setPlaylists(res.data?.playlists))
            .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                My Playlists
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    placeItems: "center",
                    m: 2,
                }}
            >
                <Button variant="contained" sx={{ mb: 2 }}>Create a new Playlist</Button>
                {playlists?.map((playlist: any) => (
                    <PlayListCard
                        id={playlist.id}
                        name={playlist.playlist_name}
                        description={playlist.description}
                    />
                ))}

            </Box>



        </Box>
    );
};
export default MyPlaylistsPage;
