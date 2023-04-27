import React, { useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { Button, Stack, Box } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BackgroundDialog from "./Components/Backgrounds/BackgroundDialog";
import OutputDialog from "./Components/Output/OutputDialog";
import { useMutation } from "react-query";
import Layout from "./Components/Layout/Layout";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const scale = keyframes`
  from {
    transform: scale(3);
  }
  to {
    transform: scale(0.5);
  }
`;

const videoConstraints = {
  width: 1920,
  height: 1080,
  deviceId: "007a17015a7042f7c22069ed778977108e600c670d05a0d675fbd68495adf767",
};

export const floatingButtonSX = {
  position: "absolute",
  zIndex: 2,
  height: "8rem",
  width: "8rem",
  borderRadius: "50%",
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
        if (countDown === 0) {
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
      <Layout>
        <Stack
          justifyContent={"center"}
          direction="row"
          alignItems={"center"}
          width={"100vw"}
          height={"100vh"}
        >
          <Webcam
            videoConstraints={videoConstraints}
            style={{
              height: "90%",
              width: "90%",
              border: "10px #788651 solid",
              outline: "15px #6b7a40 solid",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={(evt) => {
              evt.preventDefault();
              setBackgroundsDialogOpen(true);
            }}
            sx={{
              ...floatingButtonSX,
              bottom: "1rem",
              left: "1rem",
            }}
          >
            <PaletteIcon
              fontSize="large"
              sx={{ height: "5rem", width: "5rem" }}
            />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleScreenshot();
            }}
            color="secondary"
            sx={{
              ...floatingButtonSX,
              bottom: "1rem",
              right: "1rem",
            }}
          >
            <CameraAltIcon
              fontSize="large"
              sx={{ height: "5rem", width: "5rem" }}
            />
          </Button>
          <Stack
            width={1}
            height={1}
            sx={{ position: "absolute" }}
            justifyContent="center"
            alignContent={"center"}
          >
            {countDownVisisble && (
              <Box
                sx={(theme) => ({
                  textAlign: "center",
                  color: theme.palette.secondary.main,
                  fontSize: "30rem",
                  fontFamily: "bickley-script",
                  animation: `${scale} linear 1s 10`,
                  animationFillMode: "both",
                })}
              >
                {countDown !== 0 && countDown}
                {countDown === 0 && (
                  <Box
                    sx={(theme) => ({
                      color: theme.palette.secondary.main,
                      backgroundColor: "black",
                    })}
                  >
                    Say Cheese
                  </Box>
                )}
              </Box>
            )}
          </Stack>
        </Stack>
      </Layout>
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
