import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMutation } from "react-query";

type BackgroundCardProps = {
  title: string;
  onDialogClose: () => void;
  imageName: string;
  sceneItemId: number;
};

const BackgroundCard: React.FC<BackgroundCardProps> = ({
  title,
  onDialogClose,
  imageName,
  sceneItemId,
}) => {
  //const obs = useObsSocket();
  const changeBackground = useMutation(
    async () => {
      const response = await fetch(
        `http://localhost:4000/changebackground/${sceneItemId}`
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
        onClick={() => changeBackground.mutate()}
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
