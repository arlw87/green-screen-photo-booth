import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { floatingButtonSX } from "../../App";
import React, { useState } from "react";
import Layout from "../Layout/Layout";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AnimationRotateContainer from "../Animations/AnimationRotateContainer";
import FloatingButton from "../Button/FloatingButton";
import AnimationJumpContainer from "../Animations/AnimationJumpContainer";

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
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const floatingButtonPosition = {
    position: "absolute",
    zIndex: 2,
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <Layout>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box width="90%" height="90%">
              {imageName ? (
                <Stack
                  sx={{
                    width: 1,
                    height: 1,
                    border: "10px #788651 solid",
                    outline: "15px #6b7a40 solid",
                  }}
                  direction="row"
                  alignItems="center"
                >
                  <img
                    src={imageName}
                    alt="captured image"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Stack>
              ) : (
                <Typography
                  variant="h2"
                  component="p"
                  sx={{ textAlign: "center" }}
                >
                  No Image
                </Typography>
              )}

              <AnimationJumpContainer
                sx={{
                  ...floatingButtonPosition,
                  bottom: "8rem",
                  left: "8rem",
                }}
              >
                <FloatingButton
                  onClick={(evt) => {
                    evt.preventDefault();
                  }}
                >
                  <DeleteIcon sx={{ height: "5rem", width: "5rem" }} />
                </FloatingButton>
              </AnimationJumpContainer>

              <AnimationJumpContainer
                sx={{
                  ...floatingButtonPosition,
                  bottom: "8rem",
                  left: "55rem",
                }}
              >
                <FloatingButton onClick={() => setShareDialogOpen(true)}>
                  <ShareIcon sx={{ height: "5rem", width: "5rem" }} />
                </FloatingButton>
              </AnimationJumpContainer>

              <AnimationJumpContainer
                sx={{
                  ...floatingButtonPosition,
                  bottom: "8rem",
                  right: "8rem",
                }}
              >
                <FloatingButton onClick={onClose}>
                  <CloseIcon sx={{ height: "5rem", width: "5rem" }} />
                </FloatingButton>
              </AnimationJumpContainer>
            </Box>
          </Stack>
        </Layout>
      </Dialog>

      <Dialog open={shareDialogOpen} maxWidth="md">
        <Layout>
          <DialogTitle
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4">Share</Typography>{" "}
            <Button
              onClick={() => setShareDialogOpen(false)}
              sx={{ alignSelf: "center", mr: "3rem" }}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          </DialogTitle>
          <Stack>
            <Button color="secondary">Email</Button>
            <Button>Send To TV</Button>
          </Stack>
        </Layout>
      </Dialog>
    </>
  );
};

export default OutputDialog;
