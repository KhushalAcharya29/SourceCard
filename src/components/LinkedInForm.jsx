import { useState, useRef } from "react";
import LinkedInCard from "./LinkedInCard";
import CardActions from "./CardActions";
import PreviewModal from "./PreviewModal";
import CardGenerator from "./CardGenerator"; // animation
import { motion, AnimatePresence } from "framer-motion";

export default function LinkedInForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    website: "",
    linkedinUrl: "",
    email: "",
    phone: "",
    avatar: null, // profile image
  });

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

  const handleGenerationDone = () => {
    setCardData(formData);
    setIsGenerating(false);
    setTimeout(() => setConfirmed(true), 200);
  };

  // Handle profile image upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Input fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Role / Title"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Website (https://...)"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          value={formData.linkedinUrl}
          onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
        />

        {/* Profile photo upload */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Profile Image
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 file:text-sm file:font-medium 
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Preview"
                className="w-14 h-14 rounded-full object-cover border shadow-sm"
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg 
        hover:bg-blue-700 active:scale-95 transition"
      >
        Generate LinkedIn Card
      </button>

      {/* Preview modal */}
      <AnimatePresence>
        {showPreview && (
          <PreviewModal
            formData={formData}
            activeTab="linkedin"
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
                key="linkedin-card"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <LinkedInCard data={cardData} />
              </motion.div>

              <motion.div
                key="card-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-4"
              >
                <CardActions
                  cardRef={cardRef}
                  filename={`${formData.name || "linkedin"}-card`}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
