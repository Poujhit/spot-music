/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import PlayListAdd from "@mui/icons-material/PlaylistAdd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ISongCard {
    id: number;
    songName: string;
    artistNames: string;
    imageUrl: string;
    notClickable?: boolean;

}

const SongCard: React.FC<ISongCard> = (props) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ maxWidth: 280, cursor: !props.notClickable ? "pointer" : undefined, margin: 1 }}
            onClick={() => { !props.notClickable && navigate(`/song/${props.id}`) }}
            elevation={5}
        >
            <CardHeader
                action={
                    <IconButton aria-label="settings" >
                        <PlayListAdd />
                    </IconButton>
                }
            />
            <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                alt="song image"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {props.songName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.artistNames}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default SongCard;
