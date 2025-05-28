"use client";
import React from "react";
import { motion } from "motion/react";
import {
  FiCalendar,
  FiUsers,
  FiExternalLink,
  FiMonitor,
  FiClock,
  FiCheck,
  FiCheckCircle,
} from "react-icons/fi";
import { HiOutlineStatusOnline, HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";

interface HackathonCardProps {
  id: string;
  title: string;
  description: string;
  bannerImageUrl: string | null;
  startDate: string;
  mode: "ONLINE" | "OFFLINE" | "HYBRID";
  maxTeamSize: number;
  tags: string[];
  registeredParticipants: number;
}

export const HackathonCard: React.FC<HackathonCardProps> = ({
  id,
  title,
  description,
  bannerImageUrl,
  startDate,
  mode,
  maxTeamSize,
  tags,
  registeredParticipants,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getModeIcon = () => {
    switch (mode) {
      case "ONLINE":
        return <HiOutlineStatusOnline className="w-4 h-4" />;
      case "OFFLINE":
        return <HiOutlineLocationMarker className="w-4 h-4" />;
      case "HYBRID":
        return <FiMonitor className="w-4 h-4" />;
      default:
        return <HiOutlineStatusOnline className="w-4 h-4" />;
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case "OFFLINE":
        return "var(--primary-9)";
      case "HYBRID":
        return "gray";
      default:
        return "green";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-[var(--primary-1)] border border-[var(--primary-6)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ maxWidth: "450px", width: "100%" }}
    >
      {/* Banner Image Section */}
      <div className="relative h-48 overflow-hidden">
        {bannerImageUrl ? (
          <img
            src={bannerImageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-3), var(--primary-5))",
              color: "var(--primary-11)",
            }}
          >
            {title.charAt(0)}
          </div>
        )}

        {/* Mode Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
          style={{
            backgroundColor: getModeColor(),
            color: "white",
          }}
        >
          {getModeIcon()}
          {mode}
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold mb-3 line-clamp-2"
          style={{ color: "var(--primary-12)" }}
        >
          {title}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            {/* <FiExternalLink className="w-4 h-4 inline" /> */}
          </motion.button>
        </motion.h3>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {/* {tags.slice(0, 4).map((tag, index) => ( */}
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-3 py-2 text-xs font-bold rounded-full border"
              style={{
                backgroundColor: "var(--primary-3)",
                color: "var(--primary-11)",
                borderColor: "var(--primary-6)",
              }}
            >
              {tag}
            </motion.span>
          ))}
          {/* {tags.length > 4 && (
            <span
              className="px-3 py-2 text-xs font-bold rounded-full"
              style={{
                backgroundColor: "var(--primary-4)",
                color: "var(--primary-11)",
              }}
            >
              +{tags.length - 4}
            </span>
          )} */}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm mb-6 line-clamp-3"
          style={{ color: "var(--primary-11)" }}
        >
          {description}
        </motion.p>

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="flex items-center gap-2">
            <FiCalendar
              className="w-4 h-4"
              style={{ color: "var(--primary-10)" }}
            />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--primary-12)" }}
              >
                {formatDate(startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FiCheckCircle
              className="w-3 h-4 font-bold"
              style={{ color: "var(--primary-10)" }}
            />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--primary-12)" }}
              >
                {registeredParticipants} registered
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiUsers
              className="w-4 h-4"
              style={{ color: "var(--primary-10)" }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: "var(--primary-12)" }}
            >
              Max team: {maxTeamSize}
            </p>
          </div>
        </motion.div>

        {/* Apply Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            backgroundColor: "var(--primary-9)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-10)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-9)";
          }}
        >
          <FiExternalLink className="w-4 h-4" />
          <Link href={`/events/${id}`}>Apply Now</Link>
        </motion.button>
      </div>
    </motion.div>
  );
};
