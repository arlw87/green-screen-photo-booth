import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import Backgrounds from "./Backgrounds";

type BackgroundDialogProps = {
  open: boolean;
  onClose: () => void;
};

const BackgroundDialog: React.FC<BackgroundDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      //TransitionComponent={Transition}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyItems: "space-beteen",
          border: "1px red solid",
          width: 1,
        }}
      >
        <Typography
          variant="h2"
          component="h3"
          sx={{ flex: 1, textAlign: "center" }}
        >
          Change Scene
        </Typography>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ alignSelf: "center", mr: "3rem" }}
        >
          Close
        </Button>
      </DialogTitle>
      <Backgrounds onDialogClose={onClose} />
    </Dialog>
  );
};

export default BackgroundDialog;
