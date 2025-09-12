// src/pages/CardGeneratorPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DeveloperCard from "../components/DeveloperCard";
import GithubCard from "../components/GithubCard";
import PreviewModal from "../components/PreviewModal";

export default function CardGeneratorPage() {
  const [activeCardType, setActiveCardType] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [confirmedCards, setConfirmedCards] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setConfirmedCards((prev) => [
      ...prev.filter((c) => c.type !== activeCardType),
      { type: activeCardType, data: formData },
    ]);
    setShowModal(false);
  };

  const renderForm = () => {
    switch (activeCardType) {
      case "developer":
        return (
          <div className="space-y-3 mt-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub Username"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Username"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleGenerate}
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Generate Developer Card
            </button>
          </div>
        );
      case "github":
        return (
          <div className="space-y-3 mt-6">
            <input
              type="text"
              name="github"
              placeholder="GitHub Username"
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleGenerate}
              className="w-full bg-gray-800 text-white py-2 rounded"
            >
              Generate GitHub Card
            </button>
          </div>
        );
      default:
        return (
          <p className="text-gray-500 mt-6">
            Select a card type above to start creating.
          </p>
        );
    }
  };

  const renderCard = (card) => {
  switch (card.type) {
    case "developer":
      return <DeveloperCard formData={card.data} />;
    case "github":
      const githubData = {
        avatar: "https://avatars.githubusercontent.com/u/9919?v=4", // sample
        fullName: card.data.github || "N/A",
        username: card.data.github || "username",
        followers: 123,
        stars: 45,
        repos: 12,
        bio: "Passionate Open Source Contributor",
        company: "GitHub",
        location: "San Francisco",
        commits: 1000,
        prs: 50,
        issues: 20,
        joined: "2020",
        skills: ["React", "Node.js", "GraphQL"],
      };
      return <GithubCard data={githubData} />;
    default:
      return null;
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Top Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["developer", "github", "linkedin", "LeetCode", "hackerrank"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setActiveCardType(type)}
              className={`px-4 py-2 rounded ${
                activeCardType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Card
            </button>
          )
        )}
      </div>

      {/* Dynamic Form */}
      {renderForm()}

      {/* Preview Modal */}
      <AnimatePresence>
        {showModal && (
          <PreviewModal
            cardType={activeCardType}
            formData={formData}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>

      {/* Cards Section */}
      <div className="mt-10 space-y-6">
        {confirmedCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderCard(card)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
