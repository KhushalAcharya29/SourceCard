// src/components/DeveloperCard.jsx
import { Mail, Github, Linkedin, Phone, Code } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DeveloperCard({ data }) {
  const cardRef = useRef();

  const captureCard = async () => {
    if (!cardRef.current) return null;
    return await html2canvas(cardRef.current, {
      scale: 2, // ✅ sharp image on mobile
      useCORS: true,
    });
  };

  const handleDownloadImage = async () => {
    const canvas = await captureCard();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "developer-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownloadPDF = async () => {
    const canvas = await captureCard();
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("developer-card.pdf");
  };

  const handleShare = async () => {
    try {
      const canvas = await captureCard();
      if (!canvas) return;

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (navigator.share && blob) {
        const file = new File([blob], "developer-card.png", {
          type: "image/png",
        });
        await navigator.share({
          title: "My Developer Card",
          text: "Check out my Developer Card!",
          files: [file],
        });
      } else {
        alert("Native sharing not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* Card */}
      <div
  ref={cardRef}
  className="w-full max-w-sm bg-gradient-to-r from-blue-50 to-blue-100 
             rounded-2xl shadow-xl p-4 flex flex-col space-y-4"
>
  {/* Top Section (Image + QR) */}
  <div className="flex flex-col items-center space-y-3">
    {/* Avatar */}
    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 shadow-md">
      {data.avatar ? (
        <img
          src={URL.createObjectURL(data.avatar)}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          No Image
        </div>
      )}
    </div>

    {/* QR Code */}
    <div className="flex flex-col items-center">
      {data.anylink ? (
        <>
          <QRCodeCanvas
            value={data.anylink}
            size={70}
            bgColor="#ffffff"
            fgColor="#2563eb"
            level="H"
          />
          <p className="text-xs text-gray-500 mt-1">Scan to view</p>
        </>
      ) : (
        <p className="text-xs text-gray-400">No link provided</p>
      )}
    </div>
  </div>

  {/* Name & Role */}
  <div className="text-center">
    <h2 className="text-xl font-bold text-gray-800 break-words">
      {data.name || "Your Name"}
    </h2>
    <p className="text-sm text-gray-600">{data.role || "Your Role"}</p>
  </div>

    {/* Contact Box */}
  <div className="bg-blue-600 text-white rounded-xl shadow-md p-3 space-y-2 text-sm">
    {data.email && (
      <div className="flex items-center space-x-2 break-all">
        <Mail size={16} />
        <span>{data.email}</span>
      </div>
    )}
    {data.github && (
      <div className="flex items-center space-x-2 break-all">
        <Github size={16} />
        <a href={data.github} target="_blank" rel="noreferrer" className="underline">
          Github
        </a>
      </div>
    )}
    {data.linkedin && (
      <div className="flex items-center space-x-2 break-all">
        <Linkedin size={16} />
        <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline">
          LinkedIn
        </a>
      </div>
    )}
    {data.phone && (
      <div className="flex items-center space-x-2">
        <Phone size={16} />
        <span>{data.phone}</span>
      </div>
    )}
    {data.resume && (
      <div className="flex items-center space-x-2">
        <Code size={16} />
        <a
          href={data.resume}
          download="Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Resume
        </a>
      </div>
    )}
  </div>
</div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Download Image
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Share
        </button>
      </div>
    </div>
  );
}
