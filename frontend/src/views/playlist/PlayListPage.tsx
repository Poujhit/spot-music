/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "utils/customAxios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

interface PlaylistPageProps { }

const PlaylistPage: React.FC<PlaylistPageProps> = () => {
    const navigate = useNavigate();

    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState<Record<string, any>>({});

    useEffect(() => {
        customAxios
            .get(`playlist/${playlistId}/`)
            .then((res) => setPlaylist(res.data?.playlist))
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
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                    {playlist?.playlist_name}
                </Typography>

                <Box sx={{ m: 1 }} />

                <Typography variant="body2" sx={{ textAlign: "center" }}>
                    {playlist?.description}
                </Typography>
                <Box sx={{ m: 1 }} />


                <Button variant="contained">Delete playlist</Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ flexGrow: 1, maxWidth: 652 }}>
                    <List dense={false}>
                        {playlist?.tracks?.map((song: any) => (
                            <ListItem
                                key={song?.id}
                                secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="remove from playlist">
                                            <PlaylistRemoveIcon />
                                        </IconButton>
                                    </>
                                }
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    navigate(`/song/${song.id}`);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <AudiotrackIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={song?.track_title}
                                    secondary={song?.artists
                                        .map((artist: any) => artist.artist_name)
                                        .join(", ")}
                                />
                                <ListItemText
                                    secondary={`Album: ${song?.album?.album_title}`}
                                />
                                <ListItemText secondary={`Genre: ${song?.genre?.genre_name}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};
export default PlaylistPage;
