import React, { FC } from "react";
import { Button, ButtonProps, Tooltip, Typography } from "@mui/material";

type FloatingButtonProps = {
  children?: React.ReactNode;
  tooltip?: string;
} & ButtonProps;

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  tooltip,
  ...props
}) => {
  return (
    <Tooltip
      title={tooltip && <Typography variant="body1">{tooltip}</Typography>}
      arrow
    >
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
    </Tooltip>
  );
};

export default FloatingButton;
