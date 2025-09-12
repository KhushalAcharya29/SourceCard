import { useState, useRef } from "react";
import { fetchGitHubData } from "../utils/githubApi";
import GitHubCard from "./GitHubCard";
import CardActions from "./CardActions";
import PreviewModal from "./PreviewModal";
import CardGenerator from "./CardGenerator"; // animation
import { motion, AnimatePresence } from "framer-motion";

export default function GitHubCardPage() {
  const [username, setUsername] = useState("");
  const [cardData, setCardData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const animationRef = useRef(null);
  const cardRef = useRef(null);

  const handleGenerate = () => setShowPreview(true);

  const handleConfirm = () => {
    setShowPreview(false);
    setIsGenerating(true);

    // scroll smoothly to animation container
    setTimeout(() => {
      animationRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const handleGenerationDone = async () => {
    const data = await fetchGitHubData(username);
    setCardData(data);
    setIsGenerating(false);
    setTimeout(() => setConfirmed(true), 200);
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
      {/* Input Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full sm:flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
        />
        <button
          onClick={handleGenerate}
          className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-indigo-700 transition"
        >
          Generate Card
        </button>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            formData={{ github: username }}
            activeTab="github"
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

          {cardData && confirmed && (
            <>
              <motion.div
                ref={cardRef}
                key="github-card"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <GitHubCard data={cardData} />
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
                  filename={`${username}-github-card`}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
