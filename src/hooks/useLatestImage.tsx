// this needs to return a Promise that resolves to the latest image
// there needs to be a loading state
// that will render according on the dialog

import { useState } from "react";

export const useLatestImage = () => {
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getLatestImage = async () => {
    const response = await fetch("http://localhost:4000/latestimage");
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    setLoading(false);
    // console.log("path: ", data[0].path);
    setImage(data[0].name);
  };
  getLatestImage();

  return { image, loading };
};
