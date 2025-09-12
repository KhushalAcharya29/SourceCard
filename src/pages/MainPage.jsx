// src/pages/MainPage.jsx
import { useState, useRef } from "react";
import InputForm from "../components/InputForm";
import GithubForm from "../components/GithubForm";
import LinkedInForm from "../components/LinkedInForm";
import LeetCodeForm from "../components/LeetCodeForm";
import HackerRankForm from "../components/HackerRankForm";
import HackerRankCard from "../components/HackerRankCard";
import DeveloperCard from "../components/DeveloperCard";
import CardGenerator from "../components/CardGenerator";
import PreviewModal from "../components/PreviewModal";
import GithubCard from "../components/GitHubCard";
import LinkedInCard from "../components/LinkedInCard";
import LeetCodeCard from "../components/LeetCodeCard";

import { toast } from "react-hot-toast";
import { FaWallet, FaTools } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function MainPage() {
  const [activeTab, setActiveTab] = useState("developer");
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCard, setGeneratedCard] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const cardSectionRef = useRef(null);

  // user clicks Generate on form — pass data upward
  const handleGenerate = (data) => {
    setFormData(data || {}); // store the submitted data
    setShowModal(true); // open preview modal
  };

  // called when modal confirm pressed
  const handleConfirm = () => {
    setShowModal(false);

    setTimeout(() => {
      cardSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        setIsGenerating(true);
      }, 200);
    }, 120);
  };

  const handleDone = () => {
    setIsGenerating(false);
    setGeneratedCard(activeTab);
  };

  const tabs = [
    { id: "developer", label: "Developer Card" },
    { id: "github", label: "GitHub Card" },
    { id: "linkedin", label: "LinkedIn Card" },
    { id: "leetcode", label: "LeetCode Card" },
    { id: "hackerrank", label: "HackerRank Card" },
    { id: "custom", label: "Custom Card", comingSoon: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Dev Wallet */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Build Your SourceCard
        </h1>

        {/* Dev Wallet Icon */}
        <button
          onClick={() => setShowWalletModal(true)}
          className="relative p-3 rounded-full bg-white shadow-md hover:shadow-lg transition"
>
  <FaWallet className="text-indigo-600 text-xl relative z-10" />

  {/* Rotating circular border */}
  <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-spin-slow"></span>

  {/* Optional inner glow */}
  <span className="absolute inset-0 rounded-full bg-indigo-400 opacity-20 blur-md"></span>
</button>
      </div>

      {/* Tabs */}
<div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 mb-6">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => {
        if (tab.comingSoon) {
          toast("🚀 Coming Soon!");
        } else {
          setActiveTab(tab.id);
          setGeneratedCard(null);
        }
      }}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
        activeTab === tab.id && !tab.comingSoon
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-700 border"
      }`}
    >
      {tab.id === "custom" && <FaTools />}
      {tab.label}
    </button>
  ))}
</div>

      {/* Active Form */}
      <div className="max-w-md mx-auto">
        {activeTab === "developer" && (
          <InputForm
            formData={formData}
            setFormData={setFormData}
            onGenerate={(d) => handleGenerate(d)}
          />
        )}
        {activeTab === "github" && <GithubForm onGenerate={(d) => handleGenerate(d)} />}
        {activeTab === "linkedin" && <LinkedInForm onGenerate={(d) => handleGenerate(d)} />}
        {activeTab === "leetcode" && <LeetCodeForm onGenerate={(d) => handleGenerate(d)} />}
        {activeTab === "hackerrank" && <HackerRankForm onGenerate={(d) => handleGenerate(d)} />}
      </div>

      {/* Preview Modal */}
      {showModal && (
        <PreviewModal
          formData={formData}
          activeTab={activeTab}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* Card area */}
      <div ref={cardSectionRef} className="mt-8">
        {isGenerating && (
          <div className="flex justify-center">
            <CardGenerator onDone={handleDone} />
          </div>
        )}

        {!isGenerating && generatedCard === "developer" && (
          <div className="flex justify-center">
            <DeveloperCard data={formData} />
          </div>
        )}

        {!isGenerating && generatedCard === "github" && (
          <div className="flex justify-center">
            <div className="p-6 bg-white rounded-xl shadow">
              <GithubCard data={{ github: formData.github }} />
            </div>
          </div>
        )}

        {!isGenerating && generatedCard === "linkedin" && (
          <div className="flex justify-center">
            <div className="p-6 bg-white rounded-xl shadow">
              <LinkedInCard data={{ linkedin: formData.linkedin }} />
            </div>
          </div>
        )}

        {!isGenerating && generatedCard === "leetcode" && (
          <div className="flex justify-center">
            <div className="p-6 bg-white rounded-xl shadow">
              <LeetCodeCard data={{ leetcode: formData.leetcode }} />
            </div>
          </div>
        )}

        {!isGenerating && generatedCard === "hackerrank" && (
          <div className="flex justify-center">
            <div className="p-6 bg-white rounded-xl shadow">
              <HackerRankCard data={{ hackerrank: formData.hackerrank }} />
            </div>
          </div>
        )}
      </div>

      {/* Dev Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold mb-2">🚀 Coming Soon!</h2>
              <p className="text-gray-600 mb-4">
                Introducing <b>Dev Wallet</b>: Soon, all your cards will have a single, secure home.
              </p>
              <button
                onClick={() => setShowWalletModal(false)}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
