/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface IPlayListCardProps {
    id: number;
    name: string;
    description: string;
}

const PlayListCard: React.FC<IPlayListCardProps> = (props) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ maxWidth: 280, cursor: "pointer", margin: 1 }}
            onClick={() => {
                navigate(`/playlist/${props.id}`);
            }}
            elevation={5}
        >
            {/* <CardMedia
                component="img"
                height="140"
                image={props.imageUrl}
                alt="song image"
            /> */}
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PlayListCard;
