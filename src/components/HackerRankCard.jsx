import { motion } from "framer-motion";
import { SiHackerrank } from "react-icons/si";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";

export default function HackerRankCard({ username, stats = {} }) {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast("⚠️ Badges and stars not fetched due to API protection.", {
        icon: "ℹ️",
      });
      hasShownToast.current = true;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-6 flex flex-col items-center"
    >
      <div className="text-green-600 text-5xl mb-4">
        <SiHackerrank />
      </div>
      <h2 className="text-xl font-bold text-gray-800">{username}</h2>

      {/* Stats */}
      <div className="mt-4 w-full space-y-2 text-gray-700">
        <p>🏅 Stars: <span className="font-semibold">{stats.stars || "N/A"}</span></p>
        <p>✅ Problems Solved: <span className="font-semibold">{stats.solved || "N/A"}</span></p>
        <p>📊 Contest Rank: <span className="font-semibold">{stats.rank || "N/A"}</span></p>
      </div>

      {/* QR linking to HackerRank profile */}
      <div className="mt-5 bg-white p-3 rounded-xl shadow">
        <QRCode value={`https://www.hackerrank.com/${username}`}  size={100}
          bgColor="#ffffff"
          fgColor="#16a34a" />
      </div>
    </motion.div>
  );
}
