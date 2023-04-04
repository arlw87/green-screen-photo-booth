import { useQuery } from "react-query";

export const useFetch = (url: string) => {
  const urlAddress = `http://localhost:4000/${url}`;

  const { data, isLoading, error } = useQuery(urlAddress, () =>
    fetch(url).then((res) => res.json())
  );

  return { data, isLoading, error };
};
