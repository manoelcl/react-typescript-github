import { useEffect, useState } from "react";
import { Repo } from "../types";

const useRepos = (userName: string) => {
  const [repos, setRepos] = useState<Repo[]>();

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((json) => {
        console.log(Array.from(json.values()));
        setRepos(Array.from(json.values()));
      });
  }, [userName]);

  return { repos };
};

export default useRepos;
