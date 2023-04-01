import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Webcam from "react-webcam";
import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import BackgroundCard from "./Components/Backgrounds/BackgroundCard";
import Backgrounds from "./Components/Backgrounds/Backgrounds";

const videoConstraints = {
  width: 1280,
  height: 720,
};

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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
        <Button variant="contained" onClick={() => setOpen(true)}>
          Change Scene
        </Button>
      </Stack>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        //TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            border: "1px red solid",
          }}
        >
          <Typography variant="h2" component="h3">
            Change Scene
          </Typography>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogTitle>
        <Backgrounds />
      </Dialog>
    </>
  );
}

export default App;
