// src/pages/CardsPage.jsx
import { useState } from "react";
import DeveloperCard from "../components/DeveloperCard";
import GitHubCard from "../components/GitHubCard";
import CardGenerator from "../components/CardGenerator";
import { motion, AnimatePresence } from "framer-motion";

export default function CardsPage() {
  const [selectedType, setSelectedType] = useState("developer");
  const [showPreview, setShowPreview] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [cards, setCards] = useState([]);

  // Sample data
  const sampleData = {
    developer: {
      name: "John Doe",
      role: "Fullstack Developer",
      email: "johndoe@gmail.com",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      phone: "+91 9876543210",
    },
    github: {
      avatar: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
      fullName: "Jane Dev",
      username: "janedev",
      followers: "2.4k",
      stars: "4.2k",
      bio: "Hey there, I am a Github user and this is my cool github card",
      company: "Unemployed",
      commits: "5.3k",
      repos: "500",
      prs: "400",
      issues: "60",
      joined: "24/06/2016",
      location: "Mumbai",
      skills: ["Typescript", "C++", "Go", "Java", "Python"],
    },
  };

  const handleGenerate = () => {
    setShowPreview(true);
  };

  const confirmGenerate = () => {
    setShowPreview(false);
    setShowGenerator(true);

    setTimeout(() => {
      setCards([...cards, selectedType]);
      setShowGenerator(false);
    }, 3500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Top buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["developer", "github", "linkedin", "LeetCode", "hackerrank"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Card
            </button>
          )
        )}
      </div>

      {/* Input Form (just samples for now) */}
      <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
        {selectedType === "developer" && (
          <p>Form fields for Developer Card (name, role, email, etc.)</p>
        )}
        {selectedType === "github" && (
          <p>Form field: GitHub Username</p>
        )}
        {["linkedin", "LeetCode", "hackerrank"].includes(selectedType) && (
          <p>Form fields for {selectedType} (coming soon)</p>
        )}
        <button
          onClick={handleGenerate}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Generate Card
        </button>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-4">Preview</h2>
              {selectedType === "developer" && (
                <DeveloperCard data={sampleData.developer} />
              )}
              {selectedType === "github" && (
                <GitHubCard data={sampleData.github} />
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-3 py-1 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmGenerate}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generator Animation */}
      {showGenerator && <CardGenerator />}

      {/* Final Cards Display */}
      <div className="space-y-6 mt-6">
        {cards.map((type, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {type === "developer" && (
              <DeveloperCard data={sampleData.developer} />
            )}
            {type === "github" && <GitHubCard data={sampleData.github} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
