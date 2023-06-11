import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import React from "react";
import Layout from "../Layout/Layout";
import Backgrounds from "./Backgrounds";
import CloseIcon from "@mui/icons-material/Close";

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
      sx={{ height: "none" }}
      //TransitionComponent={Transition}
    >
      <Layout>
        <DialogTitle
          sx={{
            display: "grid",
            width: 1,
            gridTemplateColumns: "1fr 700px 1fr",
          }}
        >
          <Box></Box>
          <Typography variant="h2" component="h3">
            Change Scene
          </Typography>
          <Stack alignContent="center" justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={onClose}
              sx={{
                alignSelf: "center",
                borderRadius: "50%",
                height: "8rem",
                width: "8rem",
              }}
            >
              <CloseIcon sx={{ height: "5rem", width: "5rem" }} />
            </Button>
          </Stack>
        </DialogTitle>
        <Backgrounds onDialogClose={onClose} />
      </Layout>
    </Dialog>
  );
};

export default BackgroundDialog;
