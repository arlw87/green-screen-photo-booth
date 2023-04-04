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
  imageName: string;
};

const backgroundData: BackgroundData[] = [
  {
    image: background1,
    title: "Background One",
    imageName: "background1",
  },
  {
    image: background2,
    title: "Background Two",
    imageName: "background2",
  },
  {
    image: background3,
    title: "Background Three",
    imageName: "background3",
  },
  {
    image: background4,
    title: "Background Four",
    imageName: "background4",
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
          onDialogClose={onDialogClose}
          imageName={background.imageName}
        />
      ))}
    </Stack>
  );
};

export default Backgrounds;
