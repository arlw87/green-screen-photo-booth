import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  Box,
  Stack,
  DialogContent,
  DialogActions,
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
import { useMutation } from "react-query";

const getFileName = (str: string | null) => {
  return str ? str?.split('\\')?.pop()?.split('/').pop() : '';
}

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteImageRequest = useMutation(
    async(data) => {
      const repsonse = await fetch("http://localhost:4000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: getFileName(imageName)}),
      });
      return repsonse;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        console.log('success');
        setDeleteDialogOpen(false);
        onClose();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )

  const deleteImage = () => {
    console.log('delete image', imageName);
    deleteImageRequest.mutate();
    
  }

  const floatingButtonPosition = {
    position: "absolute",
    zIndex: 2,
  };

  const sendToTV = () => {
    // send a post request with the image name
  }

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
                  <DeleteIcon onClick={() => setDeleteDialogOpen(true)} sx={{ height: "5rem", width: "5rem" }} />
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{padding:"2rem"}}
      >
        <DialogTitle id="alert-dialog-title" sx={{padding:"2rem"}}>
          <Typography variant='h3'>Delete Image</Typography>
        </DialogTitle>
        <DialogContent sx={{padding: '2rem'}}>
            <Typography variant='body1'>Are you sure you want to delete this image?</Typography>
        </DialogContent>
        <DialogActions sx={{padding: '2rem', mx: 'auto'}}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant='contained' color='secondary'><Typography variant='subtitle1' sx={{pt: 2}}>Cancel</Typography></Button>
          <Button onClick={deleteImage} variant='contained'>
            <Typography variant='subtitle1' sx={{pt: 2}}>Delete</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OutputDialog;
