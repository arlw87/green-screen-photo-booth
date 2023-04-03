import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import OBSWebSocket from "obs-websocket-js";
import { useObsSocket } from "../../hooks/useObsSocket";

type BackgroundCardProps = {
  title: string;
  image: string;
  sceneItemId: number;
  onDialogClose: () => void;
};

const screenCaptureConfig = {
  requestType: "GetHotkeyList",
};

const changeBackgroundConfig = {
  requestType: "SetSceneItemEnabled",
  requestData: {
    sceneName: "Jungle Scene",
    sceneItemId: 2,
    sceneItemEnabled: false,
  },
};

const BackgroundCard: React.FC<BackgroundCardProps> = ({
  title,
  image,
  sceneItemId,
  onDialogClose,
}) => {
  //const obs = useObsSocket();

  const changeBackgroundHandler = (backgroundImage: string) => {
    // obs.call("SetSceneItemIndex", {
    //   sceneName: "Prime Scene",
    //   sceneItemId: sceneItemId,
    //   sceneItemIndex: 3,
    // });

    onDialogClose();
  };

  return (
    <Card sx={{ width: "20rem" }}>
      <CardMedia
        image={image}
        title={title}
        sx={{ width: 1, height: "10rem", cursor: "pointer" }}
        onClick={() => changeBackgroundHandler(image)}
      />
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BackgroundCard;
