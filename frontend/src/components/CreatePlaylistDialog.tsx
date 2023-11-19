import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import customAxios from "utils/customAxios";

interface CreatePlaylistDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreatePlaylistDialog: React.FC<CreatePlaylistDialogProps> = (props) => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    return (
        <Dialog open={props.open} id="dialog" onClose={props.onClose}>
            <DialogTitle id="alert-dialog-title">Create Playlist</DialogTitle>
            <DialogContent sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
            }}>

                <TextField
                    label="Playlist Name"
                    name="playlist_name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    variant="filled"
                    autoComplete="off"
                />
                <TextField
                    label="Description"
                    name="description"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    variant="filled"
                    multiline
                    rows={3}
                    autoComplete="off"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Close
                </Button>
                <Button
                    onClick={async () => {
                        await customAxios.post("create-playlist/", {
                            playlist_name: name,
                            description: description
                        });
                        window.location.reload();
                    }}
                    color="primary"
                    autoFocus
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreatePlaylistDialog;
