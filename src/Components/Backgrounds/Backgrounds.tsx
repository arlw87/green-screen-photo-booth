import React from "react";
import BackgroundCard from "./BackgroundCard";
import { Stack } from "@mui/material";
import { useQuery } from "react-query";

type BackgroundData = {
  title: string;
  fileName: string;
  sceneItemId: number;
};

type BackgroundsProps = {
  onDialogClose: () => void;
};

const Backgrounds: React.FC<BackgroundsProps> = ({ onDialogClose }) => {
  //get the background images
  const { data, isLoading, error } = useQuery<BackgroundData[]>(
    "http://localhost:4000/backgrounds/",
    () => fetch("http://localhost:4000/backgrounds").then((res) => res.json())
  );

  if (isLoading) return <span>{"loading"}</span>;
  if (error) return <span>{"error"}</span>;

  return (
    <Stack
      p="1rem"
      direction="row"
      justifyContent="center"
      flexWrap="wrap"
      gap="1rem"
    >
      {data &&
        data.map(({ title, fileName, sceneItemId }) => (
          <BackgroundCard
            key={title}
            title={title}
            onDialogClose={onDialogClose}
            imageName={fileName}
            sceneItemId={sceneItemId}
          />
        ))}
    </Stack>
  );
};

export default Backgrounds;
