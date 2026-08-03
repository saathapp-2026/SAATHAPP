import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, align = 'center', id }) {
  const alignment = align === 'left' ? 'text-left mx-0' : 'text-center mx-auto';

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl mb-12 sm:mb-16 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#0A8F3D]/20 bg-[#0A8F3D]/5 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0A8F3D]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {description}
        </p>
      )}
    </motion.div>
  );
}
