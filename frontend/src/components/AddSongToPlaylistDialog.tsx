import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AddSongToPlaylistDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onOkHandled: React.MouseEventHandler<HTMLButtonElement>;
    okButtonText: string | undefined;
    notOkButtonText: string | undefined;
}

const AddSongToPlaylistDialog: React.FC<AddSongToPlaylistDialogProps> = (props) => {
    return (
        <Dialog
            open={props.open}
            id='dialog'
            onClose={props.onClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color='primary'>
                    {props.notOkButtonText}
                </Button>
                <Button onClick={props.onOkHandled} color='primary' autoFocus>
                    {props.okButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddSongToPlaylistDialog;