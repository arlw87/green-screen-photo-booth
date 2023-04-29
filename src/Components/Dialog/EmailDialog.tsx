import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

type EmailDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
};

const EmailDialog: React.FC<EmailDialogProps> = ({
  open,
  onClose,
  onSubmit,
  size = "md",
  isLoading = false,
}) => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setEmailTouched(false);
    }
  }, [open]);

  const emailValid = email.includes("@");

  console.log("emailValid", emailValid);
  console.log("emailTouched", emailTouched);

  return (
    <Dialog
      open={open}
      onClose={() => {
        !isLoading && onClose();
      }}
      fullWidth
      maxWidth={size}
    >
      <DialogTitle sx={{ padding: "2rem 2rem 0 2rem", textAlign: "center" }}>
        <Typography variant="h3">Send Email</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          placeholder="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          error={emailTouched && !emailValid}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          inputProps={{
            sx: {
              fontFamily: "Arial",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0 2rem 2rem 2rem", textAlign: "center" }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          disabled={isLoading}
        >
          <Typography variant="subtitle1" sx={{ pt: 2 }}>
            Cancel
          </Typography>
        </Button>
        <LoadingButton
          disabled={!emailValid}
          loading={isLoading}
          onClick={() => onSubmit(email.trim())}
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
              Send
            </Typography>
          </span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EmailDialog;
