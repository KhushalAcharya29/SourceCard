// src/components/LeetCodeForm.jsx
import { useState, useRef } from "react";
import PreviewModal from "./PreviewModal";
import LeetCodeCard from "./LeetCodeCard";
import CardGenerator from "./CardGenerator";
import CardActions from "./CardActions";
import { motion, AnimatePresence } from "framer-motion";
import { fetchLeetCodeStats } from "../utils/leetcodeApi";

export default function LeetCodeForm() {
  const [username, setUsername] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [stats, setStats] = useState(null);
  const cardRef = useRef(null);
  const animRef = useRef(null);

  const handleGenerate = () => {
    if (!username.trim()) return;
    setShowPreview(true);
  };

  const handleConfirm = async () => {
    setShowPreview(false);
    setIsGenerating(true);

    // scroll to animation section
    setTimeout(() => {
      animRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const handleGenDone = async () => {
    const result = await fetchLeetCodeStats(username.trim());
    if (result) {
      setStats(result);
    }
    setIsGenerating(false);
    setTimeout(() => setConfirmed(true), 200);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Input + button row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="LeetCode Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 border rounded-lg p-2 w-full max-w-md 
            focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto px-6 py-2 bg-yellow-500 text-white rounded-lg 
            hover:bg-yellow-600 active:scale-95 transition"
        >
          Generate LeetCode Card
        </button>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            formData={{ leetcode: username }}
            activeTab="leetcode"
            onConfirm={handleConfirm}
            onCancel={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>

      {/* Animation + Card display */}
      <div className="mt-6 flex flex-col items-center" ref={animRef}>
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              key="generator"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CardGenerator onDone={handleGenDone} />
            </motion.div>
          )}
        </AnimatePresence>

        {confirmed && (
          <div className="mt-6 flex flex-col items-center gap-4 w-full">
            <div ref={cardRef} className="w-full max-w-lg">
              <LeetCodeCard username={username} stats={stats || {}} />
            </div>
            <CardActions cardRef={cardRef} filename={`${username}-leetcode-card`} />
          </div>
        )}
      </div>
    </div>
  );
}
