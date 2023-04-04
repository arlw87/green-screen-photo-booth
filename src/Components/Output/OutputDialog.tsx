import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";

type OutputDialogProps = {
  open: boolean;
  onClose: () => void;
  imageName: string | null;
};

const OutputDialog: React.FC<OutputDialogProps> = ({
  open,
  onClose,
  imageName = "No Image",
}) => {
  // get the latest image from the output folder
  // console.log("Image Details", latestImage.image);

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyItems: "space-betuseeen",
          border: "1px red solid",
          width: 1,
        }}
      >
        <Typography
          variant="h2"
          component="p"
          sx={{ flex: 1, textAlign: "center" }}
        >
          Output
        </Typography>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ alignSelf: "center", mr: "3rem" }}
        >
          Close
        </Button>
      </DialogTitle>
      {imageName ? (
        <img
          src={imageName}
          alt="captured image"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Typography variant="h2" component="p" sx={{ textAlign: "center" }}>
          No Image
        </Typography>
      )}
    </Dialog>
  );
};

export default OutputDialog;
