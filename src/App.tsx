import React, { useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import BackgroundDialog from "./Components/Backgrounds/BackgroundDialog";
import OutputDialog from "./Components/Output/OutputDialog";
import { OBSCommand } from "./hooks/OBSCommand";

const videoConstraints = {
  width: 1280,
  height: 720,
  deviceId: "007a17015a7042f7c22069ed778977108e600c670d05a0d675fbd68495adf767",
};

function App() {
  const [backgroundsDialogOpen, setBackgroundsDialogOpen] =
    React.useState(false);

  const [outputDialogOpen, setOutputDialogOpen] = React.useState(false);

  const [countDown, setCountDown] = React.useState(10);
  const [isRunning, setIsRunning] = React.useState(false);

  const handleBackgroundDialogClose = () => {
    setBackgroundsDialogOpen(false);
  };

  const handleOutputDialogClose = () => {
    setOutputDialogOpen(false);
  };

  //console.log(navigator.mediaDevices.enumerateDevices());

  //const obs = useObsSocket();

  const takeImage = () => {
    // obs.call("TriggerHotkeyByName", {
    //   hotkeyName: "OBSBasic.Screenshot",
    // });
    OBSCommand("TriggerHotkeyByName", {
      hotkeyName: "OBSBasic.Screenshot",
    });
  };

  useEffect(() => {
    if (isRunning) {
      setTimeout(() => {
        if (countDown === 1) {
          setIsRunning(false);
          setCountDown(10);
          takeImage();
          setOutputDialogOpen(true);
        } else {
          setCountDown((prevCount) => prevCount - 1);
        }
      }, 100);
    }
  }, [isRunning, countDown, takeImage, outputDialogOpen]);

  const handleScreenshot = () => {
    setIsRunning(true);
    //takeImage();
  };

  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ border: "1px red solid" }}
        width={"100vw"}
        height={"100vh"}
        rowGap={"1rem"}
      >
        <Webcam videoConstraints={videoConstraints} />
        <Button
          variant="contained"
          onClick={(evt) => {
            evt.preventDefault();
            setBackgroundsDialogOpen(true);
          }}
        >
          Change Scene
        </Button>
        <Button
          variant="contained"
          onClick={(evt) => {
            evt.preventDefault();
            handleScreenshot();
          }}
        >
          Take Image
        </Button>
        <Typography variant="h2" component="p" sx={{ textAlign: "center" }}>
          Count Down: {countDown}
        </Typography>
      </Stack>
      <BackgroundDialog
        open={backgroundsDialogOpen}
        onClose={handleBackgroundDialogClose}
      />
      <OutputDialog open={outputDialogOpen} onClose={handleOutputDialogClose} />
    </>
  );
}

export default App;
