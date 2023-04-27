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
    title: "Star Wars",
    imageName: "background1",
  },
  {
    image: background2,
    title: "Harry Potter",
    imageName: "background2",
  },
  {
    image: background3,
    title: "Mars",
    imageName: "background3",
  },
  {
    image: background4,
    title: "LOTR",
    imageName: "background4",
  },
  {
    image: background1,
    title: "Star Wars",
    imageName: "background1",
  },
  {
    image: background2,
    title: "Harry Potter",
    imageName: "background2",
  },
  {
    image: background3,
    title: "Mars",
    imageName: "background3",
  },
  {
    image: background4,
    title: "LOTR",
    imageName: "background4",
  },
];

type BackgroundsProps = {
  onDialogClose: () => void;
};

const Backgrounds: React.FC<BackgroundsProps> = ({ onDialogClose }) => {
  return (
    <Stack
      p="1rem"
      direction="row"
      justifyContent="center"
      flexWrap="wrap"
      gap="1rem"
    >
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
