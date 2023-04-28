import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";
import { animated, useSpring } from "react-spring";

type AnimationCountDownType = {
  children?: React.ReactNode;
  scaleStart?: number;
  scaleEnd?: number;
  timing?: number;
  setCount: () => void;
} & BoxProps;

const AnimationCountDown: React.FC<AnimationCountDownType> = ({
  children,
  scaleStart = 1,
  scaleEnd = 0.1,
  timing = 150,
  setCount,
  ...props
}) => {
  const style = useSpring({
    from: { transform: `scale(${scaleStart})` },
    to: { transform: `scale(${scaleEnd})` },
    loop: true,
    config: {
      duration: timing,
    },
    onRest: () => {
      console.log("fire");
      setCount();
    },
  });

  return (
    <Box {...props}>
      <animated.div style={style}>{children}</animated.div>
    </Box>
  );
};

export default AnimationCountDown;
