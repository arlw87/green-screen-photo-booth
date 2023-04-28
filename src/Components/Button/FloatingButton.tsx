import React, { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

type FloatingButtonProps = {
  children?: React.ReactNode;
} & ButtonProps;

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      disableFocusRipple
      sx={(theme) => ({
        "&.MuiButtonBase-root:hover": {
          bgcolor: theme.palette.secondary.main,
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
        borderRadius: "50%",
        height: "8rem",
        width: "8rem",
      })}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FloatingButton;
