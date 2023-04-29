import react from "react";
import AnimationJumpContainer from "../Animations/AnimationJumpContainer";
import FloatingButton from "./FloatingButton";

const floatingButtonPosition = {
  position: "absolute",
  zIndex: 2,
};

type JumpingFloatingButtonProps = {
  positionBottom: string;
  positionLeft: string;
  children?: React.ReactNode;
  onClick: () => void;
  tooltip?: string | undefined;
};

const JumpingFloatingButton: React.FC<JumpingFloatingButtonProps> = ({
  children,
  positionBottom,
  positionLeft,
  onClick,
  tooltip,
}) => {
  return (
    <AnimationJumpContainer
      sx={{
        ...floatingButtonPosition,
        bottom: positionBottom,
        left: positionLeft,
      }}
    >
      <FloatingButton
        tooltip={tooltip}
        onClick={(evt) => {
          evt.preventDefault();
          onClick();
        }}
      >
        {children}
      </FloatingButton>
    </AnimationJumpContainer>
  );
};

export default JumpingFloatingButton;
