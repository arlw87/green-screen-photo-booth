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

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <Layout>
          {/* <DialogTitle
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
        </DialogTitle> */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Box width="90%" height="90%">
              {imageName ? (
                <img
                  src={imageName}
                  alt="captured image"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "10px #788651 solid",
                    outline: "15px #6b7a40 solid",
                  }}
                />
              ) : (
                <Typography
                  variant="h2"
                  component="p"
                  sx={{ textAlign: "center" }}
                >
                  No Image
                </Typography>
              )}
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...floatingButtonSX, bottom: "8rem", left: "8rem" }}
              >
                <DeleteIcon sx={{ height: "5rem", width: "5rem" }} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...floatingButtonSX, bottom: "8rem", left: "55rem" }}
                onClick={() => setShareDialogOpen(true)}
              >
                <ShareIcon sx={{ height: "5rem", width: "5rem" }} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ...floatingButtonSX, bottom: "8rem", right: "8rem" }}
                onClick={onClose}
              >
                <CloseIcon sx={{ height: "5rem", width: "5rem" }} />
              </Button>

              <Button>Close</Button>
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
