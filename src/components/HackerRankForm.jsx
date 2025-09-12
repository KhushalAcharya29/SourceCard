// src/components/HackerRankForm.jsx
import { useState, useRef } from "react";
import PreviewModal from "./PreviewModal";
import HackerRankCard from "./HackerRankCard";
import CardActions from "./CardActions";
import CardGenerator from "./CardGenerator";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function HackerRankForm() {
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const animationRef = useRef(null);
  const cardRef = useRef(null);

  const handleGenerate = async () => {
    if (!username.trim()) return;

    // Fake fetch for now (since HackerRank API isn’t open)
    try {
      const res = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      );
      setStats(res.data || {});
    } catch (err) {
      console.error("Error fetching HackerRank data", err);
      setStats({});
    }

    setShowPreview(true);
  };

  const handleConfirm = () => {
    setShowPreview(false);
    setIsGenerating(true);

    setTimeout(() => {
      animationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleGenerationDone = () => {
    setIsGenerating(false);
    setTimeout(() => setConfirmed(true), 200);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter HackerRank Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded-lg p-2 w-full max-w-md 
            focus:ring-2 focus:ring-green-400 outline-none"
        />
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg 
            hover:bg-green-700 active:scale-95 transition"
        >
          Generate HackerRank Card
        </button>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            formData={{ hackerrank: username }}
            activeTab="hackerrank"
            onConfirm={handleConfirm}
            onCancel={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-down + smooth scroll */}
      <div className="mt-6 flex flex-col items-center" ref={animationRef}>
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              key="generator"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CardGenerator onDone={handleGenerationDone} />
            </motion.div>
          )}

          {confirmed && (
            <div className="mt-6 flex flex-col items-center gap-4 w-full">
              <motion.div
                ref={cardRef}
                key="hackerrank-card"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-lg"
              >
                <HackerRankCard username={username} stats={stats} />
              </motion.div>

              <motion.div
                key="card-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <CardActions
                  cardRef={cardRef}
                  filename={`${username}-hackerrank-card`}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
