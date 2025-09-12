// src/utils/githubApi.js
export async function fetchGitHubData(username) {
  try {
    // Fetch main user data
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const user = await userRes.json();

    // Fetch repos to calculate stars & languages
    const reposRes = await fetch(user.repos_url);
    const repos = await reposRes.json();

    // Total stars
    const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

    // Count languages
    const langMap = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    // Top 5 languages
    const skills = Object.keys(langMap)
      .sort((a, b) => langMap[b] - langMap[a])
      .slice(0, 5);

    return {
      avatar: user.avatar_url,
      fullName: user.name,
      username: user.login,
      followers: user.followers,
      stars,
      repos: user.public_repos,
      bio: user.bio,
      company: user.company,
      location: user.location,
      joined: new Date(user.created_at).toLocaleDateString("en-GB"),
      profileUrl: user.html_url,
      skills,
      commits: "—", // Needs GitHub GraphQL API (optional)
      prs: "—",     // Needs GraphQL API (optional)
      issues: "—",  // Needs GraphQL API (optional)
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
