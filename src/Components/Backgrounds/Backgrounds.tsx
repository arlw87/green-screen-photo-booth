import React from "react";
import BackgroundCard from "./BackgroundCard";
import background1 from "../../media/background1.jpg";
import background2 from "../../media/background2.jpg";
import background3 from "../../media/background3.jpg";
import background4 from "../../media/background4.jpg";
import { Stack } from "@mui/material";

type BackgroundData = {
  image: string;
  title: string;
  sceneItemId: number;
};

const backgroundData: BackgroundData[] = [
  {
    image: background1,
    title: "Background One",
    sceneItemId: 4,
  },
  {
    image: background2,
    title: "Background Two",
    sceneItemId: 5,
  },
  { image: background3, title: "Background Three", sceneItemId: 6 },
  {
    image: background4,
    title: "Background Four",
    sceneItemId: 7,
  },
];

type BackgroundsProps = {
  onDialogClose: () => void;
};

const Backgrounds: React.FC<BackgroundsProps> = ({ onDialogClose }) => {
  return (
    <Stack p="1rem" mt="1rem" direction="row" gap="2rem" flexWrap={"wrap"}>
      {backgroundData.map((background) => (
        <BackgroundCard
          key={background.title}
          title={background.title}
          image={background.image}
          sceneItemId={background.sceneItemId}
          onDialogClose={onDialogClose}
        />
      ))}
    </Stack>
  );
};

export default Backgrounds;
