import { useEffect, useState } from "react";
import { Repo } from "../types";

const useRepos = (
  userName: string
): {
  repos?: Repo[];
  changeRepos: (newName: string) => void;
} => {
  const [name, setName] = useState(userName);
  const [repos, setRepos] = useState<Repo[]>();

  const changeRepos = (newName: string) => setName(newName);

  useEffect(() => {
    fetch(`https://api.github.com/users/${name}/repos`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setRepos(Array.from(json.values()));
      });
  }, [name]);

  return { repos, changeRepos };
};

export default useRepos;
