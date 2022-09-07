import "./App.css";
import RepoCard from "./components/RepoCard";
import useRepos from "./services/useRepos";
import useUser from "./services/useUser";
import { Repo } from "./types";

function App() {
  const { user } = useUser("manoelcl");
  const { repos } = useRepos("manoelcl");

  if (!user) return <p>Loading...</p>;

  if (user.public_repos > 0) {
  }
  return (
    <div className="App">
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
  );
}

export default App;
