import { Repo } from "../types";

interface RepoCardProps {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <article>
      <h2>
        <a href={repo.url}>{repo.name}</a>
      </h2>
      <p>{repo.description}</p>
    </article>
  );
};

export default RepoCard;
