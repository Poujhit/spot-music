/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useNavigate, useLocation } from "react-router-dom";


interface ISongsListProps {
    songs: Record<string, any>[];
}

const SongsList: React.FC<ISongsListProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation()


    return (
        <Box sx={{ flexGrow: 1, maxWidth: 652 }}>
            <List dense={false}>
                {props.songs?.map((song: any) => (
                    <ListItem
                        key={song?.id}
                        // secondaryAction={
                        //     <>
                        //         <IconButton edge="end" aria-label="add to playlist" disabled={location.pathname.includes('playlist')}>
                        //             <PlaylistAddIcon />
                        //         </IconButton>
                        //     </>
                        // }
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
                        <ListItemText
                            secondary={`Genre: ${song?.genre?.genre_name}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SongsList;
