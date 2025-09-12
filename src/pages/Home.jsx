import { useState, useRef } from "react"; 
import InputForm from "../components/InputForm";
import PreviewModal from "../components/PreviewModal";
import CardGenerator from "../components/CardGenerator";
import DeveloperCard from "../components/DeveloperCard"; // ✅ fix path

export default function Home() {
  const cardSectionRef = useRef(null);
  const [formData, setFormData] = useState({
    github: "",
    linkedin: "",
    LeetCode: "",
    hackerrank: "",
    resume: null,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleGenerate = () => {
    setShowPreview(true); // open preview modal
  };

  const handleConfirm = () => {
    setShowPreview(false);

    // Show animation first
    setShowCards("generating");

    // Scroll to card section
    setTimeout(() => {
      cardSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);

    // After 3-5s, show real card
    setTimeout(() => {
      setShowCards("done");
    }, 4000);
  };

  const handleCancel = () => {
    setShowPreview(false);
  };

  return (
    <div className="space-y-10">
      {/* Input Form Section */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Developer Card Details
        </h2>
        <InputForm
          formData={formData}
          setFormData={setFormData}
          onGenerate={handleGenerate}
        />
      </section>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          formData={formData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Generated Card Section */}
      <div ref={cardSectionRef}>
        {showCards === "generating" && (
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            <CardGenerator onDone={() => setShowCards("done")} />
          </section>
        )}

        {showCards === "done" && (
  <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Developer Card
    </h2>
    <DeveloperCard data={formData} />
  </section>
)}

      </div>
    </div>
  );
}
