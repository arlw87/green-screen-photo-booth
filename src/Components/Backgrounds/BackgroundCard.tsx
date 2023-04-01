import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import OBSWebSocket from "obs-websocket-js";

type BackgroundCardProps = {
  title: string;
  image: string;
};

const obs = new OBSWebSocket();

// try {
//   const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect();
//   console.log(
//     `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`
//   );
// } catch (error) {
//   console.error("Failed to connect", error.code, error.message);
// }

const screenCaptureConfig = {
  requestType: "GetHotkeyList",
};

const BackgroundCard: React.FC<BackgroundCardProps> = ({ title, image }) => {
  const changeBackgroundHandler = (backgroundImage: string) => {
    //here i will change the background of the OBS scene
    console.log("background changed to: ", backgroundImage);
    // obs.call("TriggerHotkeyByName", {
    //   hotkeyName: "OBSBasic.Screenshot",
    // });
  };

  return (
    <Card sx={{ width: "20rem" }}>
      <CardMedia
        image={image}
        title={title}
        sx={{ width: 1, height: "10rem" }}
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
