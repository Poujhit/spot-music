/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import customAxios from "utils/customAxios";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

interface AddSongToPlaylistDialogProps {
    open: boolean;
    onClose: () => void;
    songId: any;
}

const AddSongToPlaylistDialog: React.FC<AddSongToPlaylistDialogProps> = (
    props
) => {
    const [playlists, setPlaylists] = React.useState<Record<string, any>>([]);

    useEffect(() => {
        customAxios
            .get(`user-playlists/`)
            .then((res) => setPlaylists(res.data?.playlists))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Dialog
            open={props.open}
            id="dialog"
            onClose={(e: any) => {
                e.stopPropagation();
                props.onClose();
            }}
        >
            <DialogTitle id="alert-dialog-title">
                Add the song to any one of your playlist
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <List sx={{ width: 360, maxWidth: 360, bgcolor: "background.paper" }}>
                    {playlists.map((playlist: any) => (
                        <ListItem key={playlist.id}>
                            <ListItemButton
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    await customAxios.post("add-song-to-playlist/", {
                                        playlist_id: playlist?.id,
                                        track_id: props.songId,
                                    });
                                    props.onClose();
                                }}
                                sx={{ boxShadow: 3 }}
                            >
                                <ListItemIcon>
                                    <QueueMusicIcon />
                                </ListItemIcon>
                                <ListItemText primary={playlist?.playlist_name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        props.onClose();
                    }}
                    color="primary"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddSongToPlaylistDialog;
