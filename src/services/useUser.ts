import { useEffect, useState } from "react";
import { User } from "../types";

const useUser = (
  userName: string
): {
  user?: User;
  error?: Error;
  changeUser: (userName: string) => void;
} => {
  const [name, setName] = useState(userName);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Error>();

  const changeUser = (newName: string) => setName(newName);

  useEffect(() => {
    fetch(`https://api.github.com/users/${name}`)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        console.log(json);
      });
  }, [name]);

  return { user, error, changeUser };
};

export default useUser;
