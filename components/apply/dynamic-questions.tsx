"use client";

import { Question } from "@/types/role";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicQuestionsProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswerChange: (id: string, value: string) => void;
}

export function DynamicQuestions({
  questions,
  answers,
  onAnswerChange,
}: DynamicQuestionsProps) {
  const baseClasses =
    "border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50";

  return (
    <div className="space-y-6 pt-6 border-t border-[#1C1C1C]">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <i className="hn hn-clipboard"></i>
        Additional Questions
      </h3>
      <AnimatePresence>
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <label className="block text-sm opacity-60 mb-2">
              {question.label}
              {question.required && <span className="text-red-400"> *</span>}
            </label>
            
            {question.type === "textarea" ? (
              <textarea
                name={`answer_${question.id}`}
                required={question.required}
                value={answers[question.id] || ""}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder || question.label}
                rows={4}
                className={`${baseClasses} resize-none`}
              />
            ) : (
              <input
                name={`answer_${question.id}`}
                required={question.required}
                value={answers[question.id] || ""}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                type={question.type}
                placeholder={question.placeholder || question.label}
                className={baseClasses}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}