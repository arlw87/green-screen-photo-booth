import React, { useState, useEffect } from "react";
import { Box, BoxProps } from "@mui/material";
import { animated, useSpring } from "react-spring";

type AnimationType = {
  children?: React.ReactNode;
  rotation?: number;
  timing?: number;
} & BoxProps;

const AnimationRotateContainer: React.FC<AnimationType> = ({
  children,
  rotation = 40,
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
    transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
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

export default AnimationRotateContainer;
