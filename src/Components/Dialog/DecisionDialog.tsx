import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  DialogContent,
  Button,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  handlePrimeAction: () => void;
  title: string;
  message?: string;
  primeActionButtonText: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

const DecisionDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  handlePrimeAction,
  title,
  message,
  primeActionButtonText,
  size = "sm",
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      sx={{ padding: "2rem" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ padding: "2rem", textAlign: "center" }}
      >
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "2rem", mx: "auto" }}>
        <Button onClick={onClose} variant="contained" color="secondary">
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Cancel
          </Typography>
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={handlePrimeAction}
          variant="contained"
          sx={{
            "& .MuiLoadingButton-loadingIndicator": {
              color: "black",

              "& .MuiCircularProgress-root": {
                width: "2rem !important",
                height: "2rem !important",
              },
            },
          }}
        >
          <span>
            <Typography variant="subtitle1" sx={{ pt: 2 }}>
              {primeActionButtonText}
            </Typography>
          </span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DecisionDialog;
