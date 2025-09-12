import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CardGenerator({ onDone }) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
      if (onDone) onDone();
    }, 3500); // 3.5s animation time

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {isGenerating ? (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-72 h-48">
            {/* Backside Card */}
            <motion.div
              className="absolute w-72 h-48 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              initial={{ rotate: -20, y: 100, opacity: 0 }}
              animate={{
                rotate: [0, -5, 5, 0],
                y: [0, -10, 10, 0],
                opacity: 1,
              }}
              transition={{
                duration: 3.5, // stretch animation over 3.5s
                ease: "easeInOut",
              }}
            >
              <span>Dev Card</span>
            </motion.div>

            {/* Frontside Card */}
            <motion.div
              className="absolute w-72 h-48 rounded-xl bg-white border border-gray-200 shadow-xl flex flex-col items-center justify-center p-4"
              initial={{ rotate: 20, y: -100, opacity: 0 }}
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, 10, -10, 0],
                opacity: 1,
              }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-300 mb-2"></div>
              <h2 className="font-bold">Almost ready</h2>
              <p className="text-sm text-gray-500">Generating your card...</p>
            </motion.div>
          </div>

          <p className="text-gray-700 font-medium animate-pulse">
            Hang tight! Your card is being crafted...
          </p>
        </div>
      ) : null}
    </div>
  );
}
