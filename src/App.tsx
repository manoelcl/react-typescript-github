import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FormEventHandler, useEffect, useState } from "react";
import "./App.css";
import RepoCard from "./components/RepoCard";
import useRepos from "./services/useRepos";
import useUser from "./services/useUser";
import UserIsland from "./components/UserIsland";

function App() {
  const [name, setName] = useState<string>("manoelcl");
  const { user, error, changeUser } = useUser(name);
  const { repos, changeRepos } = useRepos(name);

  const inputHandler: FormEventHandler = async (event) => {
    event.preventDefault();
    //Typescript events only have three methods and casting to HTMLInputElement is needed to get the input value
    const target = event.target as HTMLInputElement;
    const request = await fetch(`https://api.github.com/users/${target.value}`);
    console.log(request);
    if (request.ok) {
      setName(target.value);
    }

    console.log(target);
  };

  useEffect(() => {
    changeUser(name);
    changeRepos(name);
  }, [name]);

  if (error) return <p>User not found</p>;

  if (!user) return <p>Loading...</p>;

  if (user.public_repos) {
  }
  return (
    <div className="App">
      <div className="canvas">
        <Canvas
          camera={{ fov: 75, position: [0, 0, 5] }}
          style={{ backgroundImage: "linear-gradient(#87ceeb , white)" }}
          shadows
        >
          <fog attach="fog" color={"#ffeeee"} near={1.5} far={25}></fog>
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[6, 12, 6]}
            color={"#ffffff"}
            intensity={0.5}
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-bottom={-6}
            shadow-camera-top={6}
            shadow-bias={-0.0001}
          />

          {repos ? <UserIsland rep={repos} /> : null}

          <OrbitControls />
        </Canvas>
        <form onSubmit={(e) => e.preventDefault()}>
          <input onInput={inputHandler} type="text" />
        </form>
        <h1>{user.name}</h1>
        <h2>{user.login}</h2>
        <img src={user.avatar_url} alt="" />
        <h3>Contact</h3>
        <a href={user.blog}>{user.blog}</a>
        <a href={user.email}>{user.email}</a>
        <a href={user.html_url}>GitHub Profile</a>
        <h3>
          <>Followers ({user.followers})</>
        </h3>
        <h3>
          <>Repositories ({user.public_repos})</>
        </h3>

        <ul>
          {repos ? (
            repos.map((repo, index) => (
              <li key={index}>
                <RepoCard repo={repo}></RepoCard>
              </li>
            ))
          ) : (
            <li>No Repositories</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
