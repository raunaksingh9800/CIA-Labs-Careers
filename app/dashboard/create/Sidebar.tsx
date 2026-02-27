"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Role = {
  id: string;
  title: string;
  slug: string;
  description: string;
  years: number[];
  branches: string[];
  type: string;
  commitment: string;
};

type Props = {
  role: Role;
};

export default function Sidebar({ role }: Props) {
  const [debouncedRole, setDebouncedRole] = useState(role);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedRole(role);
    }, 500); // 500ms delay - adjust as needed

    return () => clearTimeout(timer);
  }, [role]);

  return (
    <div className="p-8 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Title with animation on change */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={debouncedRole.title}
            className="text-3xl font-medium mb-4 sticky top-0 bg-[#1C1C1C] z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {debouncedRole.title || "Untitled Role"}
          </motion.h1>
        </AnimatePresence>

        {/* Metadata Chips with animation on change */}
        <div className="flex flex-wrap gap-4 mb-6 opacity-60">
          <AnimatePresence mode="wait">
            <motion.div
              key={debouncedRole.years.join(",")}
              className="flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <i className="hn hn-calender"></i>
              <span className="text-sm">
                {debouncedRole?.years.length === 0
                  ? "Any Year"
                  : `${debouncedRole?.years.join(", ")} Year`}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={debouncedRole.branches.join(",")}
              className="flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <i className="hn hn-receipt"></i>
              <span className="text-sm">
                {debouncedRole?.branches.join(", ").toUpperCase()}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={debouncedRole.commitment}
              className="flex items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <i className="hn hn-clock"></i>
              <span className="text-sm">{debouncedRole?.commitment}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Markdown Content with animation on change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={debouncedRole.description}
            className="prose prose-invert prose-sm max-w-none mb-6 opacity-60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-2xl font-medium mt-6 mb-3" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-xl font-medium mt-5 mb-2" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="mb-3 opacity-80 leading-relaxed" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul
                    className="list-disc list-inside mb-3 opacity-80 space-y-1"
                    {...props}
                  />
                ),
                ol: ({ ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-3 opacity-80 space-y-1"
                    {...props}
                  />
                ),
                li: ({ ...props }) => <li className="ml-2" {...props} />,
                a: ({ ...props }) => (
                  <a className="text-[#6EFF63] hover:underline" {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-[#6EFF63] pl-4 italic opacity-70 my-3"
                    {...props}
                  />
                ),
                code: ({ className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return !match ? (
                    <code
                      className="bg-[#2A2A2A] px-1.5 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="block bg-[#2A2A2A] p-3 rounded text-sm overflow-x-auto"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {debouncedRole?.description}
            </ReactMarkdown>
          </motion.div>
        </AnimatePresence>

        {/* Tips Section - Static */}
        <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded p-4 mb-10">
          <div className="flex items-start gap-3">
            <i className="hn hn-lightbulb text-xl text-[#6EFF63]"></i>
            <div>
              <h3 className="font-medium mb-2">Application Tips</h3>
              <ul className="text-sm opacity-60 space-y-1">
                <li>• Be specific and concise in your answers</li>
                <li>• Highlight relevant experience and projects</li>
                <li>• Ensure your resume is up-to-date</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}