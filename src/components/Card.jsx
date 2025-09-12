import GithubCard from "./PlatformCards/GithubCard";
import LinkedInCard from "./PlatformCards/LinkedInCard";
import LeetCodeCard from "./PlatformCards/LeetCodeCard";
import HackerRankCard from "./PlatformCards/HackerRankCard";

export default function Card({ formData }) {
  const { github, linkedin, LeetCode, hackerrank, resume } = formData;

  return (
    <div className="mt-6">
      {github && <GithubCard username={github} />}
      {linkedin && <LinkedInCard url={linkedin} />}
      {LeetCode && <LeetCodeCard id={LeetCode} />}
      {hackerrank && <HackerRankCard username={hackerrank} />}
      {resume && (
        <div className="p-4 border rounded mt-3">
          <a href={resume} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            View Resume
          </a>
        </div>
      )}
    </div>
  );
}
