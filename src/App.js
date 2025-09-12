// src/App.js
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            SourceCard 
          </h1>
          <p className="text-gray-500 mt-2">
  Generate your card by entering your username or profile URL (GitHub, LinkedIn, LeetCode, HackerRank etc.)
</p>
        </header>
        <MainPage />
      </div>

      {/* 👇 Toast notifications rendered globally */}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
