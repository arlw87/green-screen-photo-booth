import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";
import { animated, useSpring } from "react-spring";

type AnimationType = {
  children?: React.ReactNode;
  heightPx?: number;
  timing?: number;
} & BoxProps;

const AnimationJumpContainer: React.FC<AnimationType> = ({
  children,
  heightPx = 20,
  timing = 150,
  ...props
}) => {
  const [isBooped, setIsBooped] = useState(false);

  useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeId);
    };
  }, [isBooped]);

  const style = useSpring({
    display: "inline-block",
    backfaceVisibility: "hidden",
    transform: isBooped
      ? `translate( 0px, -${heightPx}px )`
      : `translate(0px, 0px)`,
    config: {
      tension: 400,
      friction: 10,
    },
  });

  return (
    <Box {...props}>
      <animated.div onMouseEnter={() => setIsBooped(true)} style={style}>
        {children}
      </animated.div>
    </Box>
  );
};

export default AnimationJumpContainer;
