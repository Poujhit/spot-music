/* eslint-disable @typescript-eslint/no-unused-vars */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

interface ISongCard {
    songName: string;
    artistNames: string;
    imageUrl: string;
}

const SongCard: React.FC<ISongCard> = (props) => {
    return (
        <Card
            sx={{ maxWidth: 280, cursor: "pointer", margin: 1 }}
            onClick={() => { }}
            elevation={5}
        >
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
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
