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
};

const backgroundData: BackgroundData[] = [
  {
    image: background1,
    title: "Background One",
  },
  {
    image: background2,
    title: "Background Two",
  },
  { image: background3, title: "Background Three" },
  {
    image: background4,
    title: "Background Four",
  },
];

const Backgrounds = () => {
  return (
    <Stack p="1rem" mt="1rem" direction="row" gap="2rem" flexWrap={"wrap"}>
      {backgroundData.map((background) => (
        <BackgroundCard title={background.title} image={background.image} />
      ))}
    </Stack>
  );
};

export default Backgrounds;
