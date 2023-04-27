import React from "react";
import { Paper } from "@mui/material";
import img from "./white-plaster-texture.jpg";

type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          minHeight: "100%",
          background: `linear-gradient(to right, rgba(243, 237, 224, 0.5), rgba(243, 237, 224, 0.5)), url(${img})`,
        }}
      >
        {children}
      </Paper>
    </>
  );
};

export default Layout;
