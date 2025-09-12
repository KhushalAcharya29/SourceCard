import React from "react";
import { FaLinkedin, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

export default function LinkedInCard({ data = {} }) {
  const {
    name = "Your Name",
    role = "Your Role / Company",
    website,
    linkedinUrl,
    email,
    phone,
    avatar,
  } = data;

  // Extract username cleanly from LinkedIn URL
  const getLinkedInUsername = (url) => {
    if (!url) return null;
    try {
      const cleaned = url.trim().replace(/\/+$/, "");
      const parts = cleaned.split("/");
      return parts[parts.length - 1] || cleaned;
    } catch {
      return url;
    }
  };

  const linkedinUsername = getLinkedInUsername(linkedinUrl);
  const qrValue = linkedinUrl || "https://linkedin.com";

  // Fallback avatar = first letter of name
  const getInitial = (fullName) => {
    if (!fullName) return "U";
    return fullName.charAt(0).toUpperCase();
  };

  return (
    <div className="w-[340px] bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-5">
        {/* Top row: avatar + QR */}
        <div className="flex items-start justify-between">
          {/* Avatar circle */}
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 shadow-sm overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
                {getInitial(name)}
              </div>
            )}
          </div>

          {/* QR Code with LinkedIn overlay */}
          <div className="relative w-24 h-24">
            <QRCodeCanvas
              value={qrValue}
              size={96}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                in
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-gray-200" />

        {/* Name & Role */}
        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold text-blue-600 leading-tight">
            {name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{role}</p>
        </div>

        {/* Contact rows */}
        <div className="mt-5 space-y-3 text-sm text-gray-700">
          {website && (
            <div className="flex items-center gap-3">
              <FaGlobe className="text-gray-500" />
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {website}
              </a>
            </div>
          )}

          {linkedinUrl && (
            <div className="flex items-center gap-3">
              <FaLinkedin className="text-blue-600" />
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/{linkedinUsername}
              </a>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-500" />
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-500" />
              <a href={`tel:${phone}`} className="hover:underline">
                {phone}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
