import {
  Dialog,
  Typography,
  Box,
  Stack,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../Layout/Layout";

import { useMutation } from "react-query";

import CastIcon from "@mui/icons-material/Cast";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";

import { getFileName } from "../helpers/helpers";
import DecisionDialog from "../Dialog/DecisionDialog";
import JumpingFloatingButton from "../Button/JumpingFloatingButton";
import EmailDialog from "../Dialog/EmailDialog";

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
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sendToTVDialogOpen, setSendToTVDialogOpen] = useState(false);

  const deleteImageRequest = useMutation(
    async (data) => {
      const repsonse = await fetch("http://localhost:4000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: getFileName(imageName) }),
      });
      return repsonse;
    },
    {
      onSuccess: (data) => {
        setSnackbarMessage("Image Deleted");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        onClose();
      },
      onError: (error) => {
        setSnackbarMessage("Image Failed to Delete");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.log(error);
      },
    }
  );

  const sendToTVRequest = useMutation(
    async (data) => {
      const response = await fetch("http://localhost:4000/cast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: getFileName(imageName) }),
      });
      return response;
    },
    {
      onSuccess: (data) => {
        setSnackbarMessage("Image sent to TV");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSendToTVDialogOpen(false);
      },
      onError: (error) => {
        console.log(error);
        setSnackbarMessage("Image failed to be sent to TV");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      },
    }
  );

  type postEmail = {
    emailAddress: string;
    fileName: string;
  };

  const sendEmailRequest = useMutation(
    async (data: postEmail) => {
      const response = await fetch("http://localhost:4000/sendemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: data.fileName,
          emailAddress: data.emailAddress,
        }),
      });
      console.log("response", response);
      if (response.status !== 200) {
        throw new Error("Email Failed");
      }
      return response;
    },
    {
      onSuccess: (data) => {
        setSnackbarMessage("Email Sent");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setEmailDialogOpen(false);
      },
      onError: (error) => {
        console.log(error);
        setSnackbarMessage("Email Failed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      },
    }
  );

  const deleteImage = () => {
    deleteImageRequest.mutate();
  };

  const sendToTV = () => {
    console.log("Sending to TV");
    sendToTVRequest.mutate();
  };

  const sendEmail = (emailAddress: string) => {
    console.log("Sending Email");
    console.log("emailAddress", emailAddress);
    sendEmailRequest.mutate({
      emailAddress,
      fileName: getFileName(imageName) ?? "",
    });
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <Layout sx={{ minHeight: "100%" }}>
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
                    alt="captured"
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

              <JumpingFloatingButton
                onClick={() => setDeleteDialogOpen(true)}
                positionBottom="8rem"
                positionLeft="7%"
              >
                <DeleteIcon sx={{ height: "5rem", width: "5rem" }} />
              </JumpingFloatingButton>

              <JumpingFloatingButton
                onClick={() => setEmailDialogOpen(true)}
                positionBottom="8rem"
                positionLeft="42%"
                tooltip="Email Image"
              >
                <EmailIcon sx={{ height: "5rem", width: "5rem" }} />
              </JumpingFloatingButton>

              <JumpingFloatingButton
                onClick={() => setSendToTVDialogOpen(true)}
                positionBottom="8rem"
                positionLeft="52%"
                tooltip="Send to TV"
              >
                <CastIcon sx={{ height: "5rem", width: "5rem" }} />
              </JumpingFloatingButton>

              <JumpingFloatingButton
                onClick={onClose}
                positionBottom="8rem"
                positionLeft="88%"
              >
                <CloseIcon sx={{ height: "5rem", width: "5rem" }} />
              </JumpingFloatingButton>
            </Box>
          </Stack>
        </Layout>
      </Dialog>

      <DecisionDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        title="Delete Image"
        message="Are you sure you want to delete this image?"
        primeActionButtonText="Delete"
        handlePrimeAction={deleteImage}
        isLoading={deleteImageRequest.isLoading}
      />

      <DecisionDialog
        open={sendToTVDialogOpen}
        onClose={() => setSendToTVDialogOpen(false)}
        title="Display on TV"
        message="Click send to be displayed on the TV"
        primeActionButtonText="Send"
        handlePrimeAction={sendToTV}
        size="md"
      />

      {/* <DecisionDialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        title="Send Email"
        message="Click Here to send email"
        primeActionButtonText="Send"
        handlePrimeAction={sendEmail}
        size="md"
        isLoading={sendEmailRequest.isLoading}
      /> */}

      <EmailDialog
        size="sm"
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        onSubmit={sendEmail}
        isLoading={sendEmailRequest.isLoading}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Note archived"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          sx={{
            fontSize: "2rem",
            lineHeight: "3rem",
            height: "4rem",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
          variant="filled"
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OutputDialog;
