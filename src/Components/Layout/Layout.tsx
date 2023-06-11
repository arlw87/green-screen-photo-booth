import React from "react";
import { Paper, SxProps } from "@mui/material";
import img from "./white-plaster-texture.jpg";

type LayoutProps = {
  children: any;
  sx?: SxProps;
};

const Layout: React.FC<LayoutProps> = ({ children, sx }) => {
  return (
    <>
      <Paper
        sx={{
          ...sx,
          width: "100%",
          background: `linear-gradient(to right, rgba(243, 237, 224, 0.5), rgba(243, 237, 224, 0.5)), url(${img})`,
        }}
      >
        {children}
      </Paper>
    </>
  );
};

export default Layout;
