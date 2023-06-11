import React from "react";
import BackgroundCard from "./BackgroundCard";
import { Stack } from "@mui/material";
import { useQuery } from "react-query";

type BackgroundData = {
  title: string;
  imageName: string;
};

const backgroundData: BackgroundData[] = [
  {
    title: "Star Wars",
    imageName: "background1",
  },
  {
    title: "Harry Potter",
    imageName: "background2",
  },
  {
    title: "Mars",
    imageName: "background3",
  },
  {
    title: "LOTR",
    imageName: "background4",
  },
  {
    title: "Iron Man",
    imageName: "background5",
  },
  {
    title: "Star Wars",
    imageName: "background1",
  },
  {
    title: "Harry Potter",
    imageName: "background2",
  },
  {
    title: "Mars",
    imageName: "background3",
  },
  {
    title: "LOTR",
    imageName: "background4",
  },
];

type BackgroundsProps = {
  onDialogClose: () => void;
};

const Backgrounds: React.FC<BackgroundsProps> = ({ onDialogClose }) => {
  //get the background images
  const { data, isLoading, error } = useQuery(
    "http://localhost:4000/backgrounds/",
    () => fetch("http://localhost:4000/backgrounds").then((res) => res.json())
  );

  if (isLoading) return "loading";
  if (error) return "error";

  return (
    <Stack
      p="1rem"
      direction="row"
      justifyContent="center"
      flexWrap="wrap"
      gap="1rem"
    >
      {data.map((background) => (
        <BackgroundCard
          key={background.title}
          title={background.title}
          onDialogClose={onDialogClose}
          imageName={background.imageName}
        />
      ))}
    </Stack>
  );
};

export default Backgrounds;
