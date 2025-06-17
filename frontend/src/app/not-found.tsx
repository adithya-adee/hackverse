"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-1)] via-[var(--primary-3)] to-[var(--primary-2)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 relative"
        >
          <motion.div
            className="text-[10rem] font-bold text-[var(--primary-9)] opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{
              scale: [0.8, 1.2, 1],
              rotate: [-5, 5, 0],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            404
          </motion.div>
          <motion.h1
            className="text-[8rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-9)] to-[var(--primary-11)]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--primary-12)] mb-2">
            Page Not Found
          </h2>
          <p className="text-[var(--primary-11)] mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>

          {/* Animated Lost Connection Line */}
          <div className="relative h-1 w-48 mx-auto mb-8 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[var(--primary-9)]"
              initial={{ width: "100%" }}
              animate={{ width: ["100%", "0%", "100%"] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/")}
              className="bg-[var(--primary-9)] hover:bg-[var(--primary-10)] text-[var(--primary-1)]"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>

            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-[var(--primary-7)] hover:bg-[var(--primary-4)]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button
              onClick={() => router.push("/search")}
              variant="ghost"
              className="text-[var(--primary-11)] hover:text-[var(--primary-12)]"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Animated Connection Dots */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[var(--primary-9)]"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
}
