// src/components/CardActions.jsx
import { FiDownload, FiShare2, FiFileText } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CardActions({ cardRef, filename }) {
  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${filename}.png`;
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20; // padding
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my Developer Card",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {/* PNG */}
      <button
        onClick={handleDownloadPNG}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
      >
        <FiDownload className="text-lg" />
        <span className="text-sm sm:text-base">PNG</span>
      </button>

      {/* PDF */}
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition shadow"
      >
        <FiFileText className="text-lg" />
        <span className="text-sm sm:text-base">PDF</span>
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow"
      >
        <FiShare2 className="text-lg" />
        <span className="text-sm sm:text-base">Share</span>
      </button>
    </div>
  );
}
