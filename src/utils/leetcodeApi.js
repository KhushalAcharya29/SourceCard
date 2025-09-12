// src/utils/leetcodeApi.js
export async function fetchLeetCodeStats(username) {
  try {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data.status === "success") {
      return {
        solved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        ranking: data.ranking,
        acceptance: data.acceptanceRate.toFixed(2),
      };
    } else {
      throw new Error("Failed to fetch stats");
    }
  } catch (err) {
    console.error("LeetCode API error:", err);
    return null;
  }
}
