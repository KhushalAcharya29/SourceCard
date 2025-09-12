// src/components/LeetCodeCard.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import QRCode from "react-qr-code";

export default function LeetCodeCard({ username = "unknown", stats = {} }) {
  const {
    solved = 0,
    easySolved = 0,
    mediumSolved = 0,
    hardSolved = 0,
    ranking = "N/A",
    acceptance = "N/A",
  } = stats;

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch LeetCode avatar (fallback = LeetCode logo)
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await res.json();
        if (data && data.avatar) {
          setAvatar(data.avatar);
        } else {
          setAvatar("https://leetcode.com/static/images/LeetCode_logo_rvs.png");
        }
      } catch (err) {
        setAvatar("https://leetcode.com/static/images/LeetCode_logo_rvs.png");
      } finally {
        setLoading(false);
      }
    };
    if (username !== "unknown") fetchAvatar();
  }, [username]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center"
    >
      {/* Avatar + Icon */}
      <div className="relative">
        {loading ? (
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={avatar}
            alt="LeetCode Avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500 shadow-md"
          />
        )}
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 text-yellow-500 shadow">
          <SiLeetcode size={20} />
        </div>
      </div>

      {/* Username */}
      <h2 className="mt-4 text-xl font-bold text-gray-800">{username}</h2>

      {/* Stats */}
      <div className="mt-4 w-full space-y-2 text-gray-700 text-sm">
        <p>
          🏆 Rank: <span className="font-semibold">{ranking}</span>
        </p>
        <p>
          ✅ Solved: <span className="font-semibold">{solved}</span>
        </p>
        <p>
          Easy / Medium / Hard:{" "}
          <span className="font-semibold">
            {easySolved} / {mediumSolved} / {hardSolved}
          </span>
        </p>
        <p>
          📈 Acceptance: <span className="font-semibold">{acceptance}%</span>
        </p>
      </div>

      {/* QR Code */}
      <div className="mt-6 bg-white p-3 rounded-xl shadow">
        <QRCode
          value={`https://leetcode.com/${username}/`}
          size={100}
          bgColor="#ffffff"
          fgColor="#f59e0b"
        />
      </div>
    </motion.div>
  );
}
