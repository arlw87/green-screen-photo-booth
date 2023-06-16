import React, { useEffect, useState } from "react";
import "./App.css";
import Webcam from "react-webcam";
import { Button, Stack, Box, Typography } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import BackgroundDialog from "./Components/Backgrounds/BackgroundDialog";
import OutputDialog from "./Components/Output/OutputDialog";
import { useMutation } from "react-query";
import Layout from "./Components/Layout/Layout";
import { keyframes } from "@mui/system";
import AnimationRotateContainer from "./Components/Animations/AnimationRotateContainer";
import FloatingButton from "./Components/Button/FloatingButton";
import AnimationCountDown from "./Components/Animations/AnimationCountDown";

const flash = keyframes`
  0% {
    opacity: 0;
  },
  50% {
    opacity: 1;
  },
  100% {
    opacity: 0;
  }
`;

const videoConstraints = {
  width: 1920,
  height: 1080,
  deviceId: "919fe01697988eaeda90ce62025c09c35d26a0ce7b50a21f91fb95d6556b09b3",
};

export const floatingButtonSX = {
  position: "absolute",
  zIndex: 2,
  height: "8rem",
  width: "8rem",
  borderRadius: "50%",
};

const floatingButtonPosition = {
  position: "absolute",
  zIndex: 2,
};

function App() {
  const [outputImage, setOutputImage] = React.useState<string | null>(null);
  const [countDownVisisble, setCountDownVisible] = React.useState(false);
  const [enableFlash, setEnableFlash] = useState(false);
  const [countDown, setCountDown] = React.useState(10);

  //react query
  const captureImage = useMutation(
    async (data) => {
      const response = await fetch("http://localhost:4000/screenshot");
      const jsonData = await response.json();
      return jsonData;
    },
    {
      onSuccess: (data) => {
        setOutputDialogOpen(true);
        setOutputImage(data);
        setEnableFlash(false);
        setCountDown(10);
      },
      onError: (error) => {
        console.log("Error: ", error);
      },
    }
  );

  const [backgroundsDialogOpen, setBackgroundsDialogOpen] =
    React.useState(false);

  const [outputDialogOpen, setOutputDialogOpen] = React.useState(false);

  const handleBackgroundDialogClose = () => {
    setBackgroundsDialogOpen(false);
  };

  const handleOutputDialogClose = () => {
    setOutputDialogOpen(false);
  };

  console.log(navigator.mediaDevices.enumerateDevices());

  const takeImage = () => {
    setEnableFlash(true);
    captureImage.mutate();
  };

  const reduceCount = () => {
    console.log(countDown);
    setCountDown((prev) => prev - 1);
  };

  const handleScreenshot = () => {
    setCountDownVisible(true);
  };

  useEffect(() => {
    if (countDown === 0) {
      setCountDownVisible(false);
      takeImage();
    }

    if (countDown < 0) {
      setCountDown(10);
    }
  }, [countDown]);

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

          <AnimationRotateContainer
            sx={{ ...floatingButtonPosition, bottom: "2rem", right: "2rem" }}
          >
            <FloatingButton
              onClick={(evt) => {
                evt.preventDefault();
                handleScreenshot();
              }}
            >
              <CameraAltIcon
                fontSize="large"
                sx={{ height: "5rem", width: "5rem" }}
              />
            </FloatingButton>
          </AnimationRotateContainer>
          <AnimationRotateContainer
            sx={{ ...floatingButtonPosition, bottom: "2rem", left: "2rem" }}
          >
            <FloatingButton
              onClick={(evt) => {
                evt.preventDefault();
                setBackgroundsDialogOpen(true);
              }}
            >
              <PaletteIcon
                fontSize="large"
                sx={{ height: "5rem", width: "5rem" }}
              />
            </FloatingButton>
          </AnimationRotateContainer>

          {countDownVisisble && (
            <Stack
              width={1}
              height={1}
              sx={{ position: "absolute" }}
              justifyContent="center"
              alignItems={"center"}
              direction="row"
            >
              <AnimationCountDown
                sx={(theme) => ({
                  textAlign: "center",
                  color: theme.palette.secondary.main,
                  fontSize: "100rem",
                  lineHeight: "100rem",
                  fontFamily: "bickley-script",
                })}
                timing={1000}
                setCount={reduceCount}
              >
                {countDown !== 0 && countDown}
              </AnimationCountDown>
            </Stack>
          )}
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
      {enableFlash && (
        <Box
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            backgroundColor: "white",
            top: 0,
            left: 0,
            animation: `${flash} ease-out 1s 1`,
            animationFillMode: "both",
          }}
        ></Box>
      )}
    </>
  );
}

export default App;
