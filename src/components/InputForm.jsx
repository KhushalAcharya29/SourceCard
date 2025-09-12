import { useState } from "react";

export default function InputForm({ formData, setFormData, onGenerate }) {
  const [localData, setLocalData] = useState(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(localData);      // update parent state
    onGenerate(localData);       // pass fresh data to parent (important)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={localData.name || ""}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role / Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
        <input
          type="text"
          name="role"
          value={localData.role || ""}
          onChange={handleChange}
          placeholder="e.g., Full Stack Developer"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={localData.email || ""}
          onChange={handleChange}
          placeholder="e.g., johndoe@gmail.com"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          value={localData.phone || ""}
          onChange={handleChange}
          placeholder="e.g., +91 98765 43210"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Any Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Any Link (Portfolio / Social)</label>
        <input
          type="url"
          name="anylink"
          value={localData.anylink || ""}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Avatar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Image</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* GitHub */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Username</label>
        <input
          type="text"
          name="github"
          value={localData.github || ""}
          onChange={handleChange}
          placeholder="e.g., johndoe"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
        <input
          type="url"
          name="linkedin"
          value={localData.linkedin || ""}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/..."
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* LeetCode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">LeetCode User ID</label>
        <input
          type="text"
          name="LeetCode"
          value={localData.LeetCode || ""}
          onChange={handleChange}
          placeholder="e.g., 1234567"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* HackerRank */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">HackerRank Username</label>
        <input
          type="text"
          name="hackerrank"
          value={localData.hackerrank || ""}
          onChange={handleChange}
          placeholder="e.g., coder123"
          className="w-full border rounded-xl px-3 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Resume */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/DOC)</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition font-medium"
      >
        Generate Developer Card
      </button>
    </form>
  );
}