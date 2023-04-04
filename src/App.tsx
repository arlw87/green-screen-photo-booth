import React, { useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import BackgroundDialog from "./Components/Backgrounds/BackgroundDialog";
import OutputDialog from "./Components/Output/OutputDialog";
import { useMutation } from "react-query";

const videoConstraints = {
  width: 1280,
  height: 720,
  deviceId: "007a17015a7042f7c22069ed778977108e600c670d05a0d675fbd68495adf767",
};

function App() {
  const [outputImage, setOutputImage] = React.useState<string | null>(null);
  const [countDownVisisble, setCountDownVisible] = React.useState(false);

  //react query
  const captureImage = useMutation(
    async (data) => {
      const response = await fetch("http://localhost:4000/screenshot");
      const jsonData = await response.json();
      return jsonData;
    },
    {
      onSuccess: (data) => {
        console.log("Success: ", data);
        setOutputDialogOpen(true);
        setOutputImage(data);
      },
      onError: (error) => {
        console.log("Error: ", error);
      },
    }
  );

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

  const takeImage = () => {
    captureImage.mutate();
  };

  useEffect(() => {
    if (isRunning) {
      setTimeout(() => {
        if (countDown === 1) {
          setIsRunning(false);
          setCountDown(10);
          setCountDownVisible(false);
          takeImage();
        } else {
          setCountDown((prevCount) => prevCount - 1);
        }
      }, 1000);
    }
  }, [isRunning, countDown, takeImage, outputDialogOpen]);

  const handleScreenshot = () => {
    setIsRunning(true);
    setCountDownVisible(true);
  };

  return (
    <>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ backgroundColor: "black" }}
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
          sx={{ position: "absolute", bottom: "1rem", left: "1rem", zIndex: 2 }}
        >
          Change Scene
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleScreenshot();
          }}
          sx={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            zIndex: 2,
          }}
        >
          Take Image
        </Button>
        <Stack
          width={1}
          height={1}
          sx={{ position: "absolute" }}
          justifyContent="center"
          alignContent={"center"}
        >
          {countDownVisisble && (
            <Typography
              variant="h1"
              component="p"
              sx={{
                textAlign: "center",
                color: "white",
              }}
            >
              {countDown}
            </Typography>
          )}
        </Stack>
      </Stack>
      <BackgroundDialog
        open={backgroundsDialogOpen}
        onClose={handleBackgroundDialogClose}
      />
      <OutputDialog
        open={outputDialogOpen}
        onClose={handleOutputDialogClose}
        imageName={outputImage}
      />
    </>
  );
}

export default App;
