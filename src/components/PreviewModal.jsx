// src/components/PreviewModal.jsx
export default function PreviewModal({ formData, activeTab, onConfirm, onCancel }) {
  const title = activeTab ? `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Card.json` : "Preview";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 text-gray-300 flex items-center justify-between px-4 py-2">
          <span className="text-sm font-mono">{title}</span>
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
        </div>

        {/* Code Area */}
        <div className="p-6 font-mono text-sm text-green-400 whitespace-pre">
          {"{"}
          {activeTab === "developer" && (
            <>
              <div className="ml-4">
                "name": "<span className="text-blue-400">{formData.name ?? "N/A"}</span>",
              </div>
              <div className="ml-4">
                "role": "<span className="text-blue-400">{formData.role ?? "N/A"}</span>",
              </div>
              {formData.email && (
                <div className="ml-4">
                  "email": "<span className="text-blue-400">{formData.email}</span>",
                </div>
              )}
              {formData.phone && (
                <div className="ml-4">
                  "phone": "<span className="text-blue-400">{formData.phone}</span>",
                </div>
              )}
              {formData.github && (
                <div className="ml-4">
                  "github": "<span className="text-blue-400">{formData.github}</span>",
                </div>
              )}
              {formData.linkedinUrl && (
                <div className="ml-4">
                  "linkedin": "<span className="text-blue-400">{formData.linkedinUrl}</span>",
                </div>
              )}
              {formData.anylink && (
                <div className="ml-4">
                  "portfolio": "<span className="text-blue-400">{formData.anylink}</span>",
                </div>
              )}
              {formData.resume && (
                <div className="ml-4">
                  "resume": "<span className="text-blue-400">{formData.resume.name}</span>"
                </div>
              )}
            </>
          )}

          {activeTab === "github" && formData.github && (
            <div className="ml-4">
              "github": "<span className="text-blue-400">{formData.github}</span>"
            </div>
          )}

          {activeTab === "linkedin" && formData.linkedinUrl && (
            <div className="ml-4">
              "linkedin": "<span className="text-blue-400">{formData.linkedinUrl}</span>"
            </div>
          )}

          {activeTab === "leetcode" && formData.leetcode && (
            <div className="ml-4">
              "LeetCode": "<span className="text-blue-400">{formData.leetcode}</span>"
            </div>
          )}

          {activeTab === "hackerrank" && formData.hackerrank && (
            <div className="ml-4">
              "hackerrank": "<span className="text-blue-400">{formData.hackerrank}</span>"
            </div>
          )}
          {"}"}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 bg-gray-800 px-6 py-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
          >
            Confirm & Generate
          </button>
        </div>
      </div>
    </div>
  );
}
