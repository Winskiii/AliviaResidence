import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
  className = "",
}) => {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <motion.span
          className={`inline-block text-sm font-semibold tracking-widest uppercase mb-3 px-4 py-1 rounded-full ${
            light
              ? "bg-white/20 text-white"
              : "bg-primary/10 text-primary"
          }`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          light ? "text-white" : "text-gray-900"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {/* Accent line */}
      <motion.div
        className={`flex ${center ? "justify-center" : ""} mb-5`}
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="h-1 w-12 bg-accent rounded-full" />
          <div className="h-1 w-4 bg-primary rounded-full" />
          <div className="h-1 w-2 bg-accent rounded-full" />
        </div>
      </motion.div>

      {subtitle && (
        <motion.p
          className={`text-lg leading-relaxed max-w-2xl ${center ? "mx-auto" : ""} ${
            light ? "text-white/80" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;
