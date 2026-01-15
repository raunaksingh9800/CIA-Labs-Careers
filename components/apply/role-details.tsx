"use client";

import { Role } from "@/types/role";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export function RoleDetails({ role }: { role: Role }) {
  return (
    <div className="p-8 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >


        <h1 className="text-3xl font-medium mb-4">{role.title}</h1>

        {/* Metadata Chips */}
        <div className="flex flex-wrap gap-4 mb-6 opacity-60">
          <div className="flex items-center gap-2">
            <i className="hn hn-calender"></i>
            <span className="text-sm">
              {role.years.length === 0
                ? "Any Year"
                : `${role.years.join(", ")} Year`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <i className="hn hn-receipt"></i>
            <span className="text-sm">{role.branches.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="hn hn-clock"></i>
            <span className="text-sm">{role.commitment}</span>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-invert prose-sm max-w-none mb-6 opacity-60">
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
                <ul className="list-disc list-inside mb-3 opacity-80 space-y-1" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal list-inside mb-3 opacity-80 space-y-1" {...props} />
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
              // Simplified code block for brevity
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                return !match ? (
                  <code className="bg-[#2A2A2A] px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block bg-[#2A2A2A] p-3 rounded text-sm overflow-x-auto" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {role.description}
          </ReactMarkdown>
        </div>

        {/* Tips Section */}
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