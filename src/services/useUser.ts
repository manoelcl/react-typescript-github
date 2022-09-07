import { useEffect, useState } from "react";
import { User } from "../types";

const useUser = (userName: string) => {
  const [user, setUser] = useState<User | User>();

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUser(json);
      });
  }, [userName]);

  return { user };
};

export default useUser;
