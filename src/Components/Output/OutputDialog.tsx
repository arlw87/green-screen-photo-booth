import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLatestImage } from "../../hooks/useLatestImage";

type OutputDialogProps = {
  open: boolean;
  onClose: () => void;
};

const OutputDialog: React.FC<OutputDialogProps> = ({ open, onClose }) => {
  // get the latest image from the output folder
  const latestImage = useLatestImage();
  // console.log("Image Details", latestImage.image);
  const imageName = "one.jpeg";

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

      {latestImage.loading && <Typography>Loading...</Typography>}
      {!latestImage.loading && (
        <img
          src={`http://localhost:4000/${imageName}`}
          style={{ width: "600px", height: "400px" }}
        />
      )}
    </Dialog>
  );
};

export default OutputDialog;
