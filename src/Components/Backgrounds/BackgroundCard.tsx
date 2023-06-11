import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import OBSWebSocket from "obs-websocket-js";
import { useObsSocket } from "../../hooks/useObsSocket";
import { useMutation } from "react-query";
import { ThemeContext } from "@mui/styled-engine";

type BackgroundCardProps = {
  title: string;
  onDialogClose: () => void;
  imageName: string;
};

const BackgroundCard: React.FC<BackgroundCardProps> = ({
  title,
  onDialogClose,
  imageName,
}) => {
  //const obs = useObsSocket();
  const changeBackground = useMutation(
    async (backgroundName: string) => {
      const response = await fetch(
        `http://localhost:4000/changebackground/${backgroundName}`
      );
      const jsonData = await response.json();
      return jsonData;
    },
    {
      onSuccess: (data) => {
        console.log("Success: ", data);
        onDialogClose();
      },
      onError: (error) => {
        console.log("Error: ", error);
      },
    }
  );

  const changeBackgroundHandler = (backgroundImage: string) => {
    changeBackground.mutate(backgroundImage);
  };

  console.log(`http://localhost:4000/backdrops/${imageName}.jpg`);

  return (
    <Card
      sx={(theme) => ({
        width: "30rem",
        backgroundColor: theme.palette.background.paper,
      })}
      elevation={6}
    >
      <CardMedia
        image={`http://localhost:4000/backdrops/${imageName}.jpg`}
        title={title}
        sx={{ width: 1, height: "20rem", cursor: "pointer" }}
        onClick={() => changeBackgroundHandler(imageName)}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            pt: "1rem",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BackgroundCard;
