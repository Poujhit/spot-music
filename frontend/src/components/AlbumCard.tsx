/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


interface IAlbumCardProps {
    id: number;
    imageUrl: string;
    albumName: string;
    artistNames: string;
    notClickable?: boolean;

}

const AlbumCard: React.FC<IAlbumCardProps> = (props) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ maxWidth: 280, cursor: !props.notClickable ? "pointer" : undefined, margin: 1 }}
            onClick={() => { !props.notClickable && navigate(`/album/${props.id}`) }}
            elevation={5}
        >

            <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                alt="song image"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {props.albumName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.artistNames}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AlbumCard;
