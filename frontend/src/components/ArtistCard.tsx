/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

// "id": 3,
//             "artist_name": "Kendrick Lamar",
//             "image_url": "https://maxillo.netlify.app/artistpl.jpeg",

interface IArtistCardProps {
    imageUrl: string;
    id: number;
    name: string;
    notClickable?: boolean;
}

const ArtistCard: React.FC<IArtistCardProps> = (props) => {
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                maxWidth: 280,
                cursor: !props.notClickable ? "pointer" : undefined,
                margin: 1,
            }}
            onClick={() => {
                !props.notClickable && navigate(`/artist/${props.id}`);
            }}
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
                    {props.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    {props.artistNames}
                </Typography> */}
            </CardContent>
        </Card>
    );
};

export default ArtistCard;
