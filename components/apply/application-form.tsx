"use client";

import { useState, useTransition } from "react";
import { Role } from "@/types/role";
import { apply } from "@/app/actions/apply";
import { ResumeUpload } from "@/components/resume-upload";
import { DynamicQuestions } from "./dynamic-questions";
import { motion } from "framer-motion";
import Link from "next/link";

export function ApplicationForm({ role }: { role: Role }) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await apply(formData);
    });
  };

  return (
    <div className="py-4 px-4 lg:px-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl  pb-12"
      >
        {/* Mobile Header */}

        <div className="flex items-center gap-2 opacity-60 text-xs mb-6">
          <i className="hn hn-arrow-left"></i>
          <Link
            href={`/roles?slug=${role.slug}`}
            className="hover:opacity-100 transition-opacity"
          >
            Back to Role
          </Link>
        </div>

        <h1 className="text-3xl font-medium lg:hidden  mt-4 mb-4">{role.title}</h1>

        <h2 className="lg:text-2xl font-medium mb-2  opacity-60 lg:opacity-100">
          Apply for this Position
        </h2>
        <p className="opacity-60 mb-8">
          Fill out the form below to submit your application.
        </p>

        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="roleSlug" value={role.slug} />
          <input type="hidden" name="answers" value={JSON.stringify(answers)} />
          <input type="hidden" name="resumeUrl" value={resumeUrl ?? ""} />

          {/* Basic Information Block */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <i className="hn hn-user"></i>
              Basic Information
            </h3>
            {/* ... Basic Inputs (Name, Email, Phone) ... */}
            <div>
              <label className="block text-sm opacity-60 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm opacity-60 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm opacity-60 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="border-dotted w-full outline-0 opacity-60 transition-all focus-within:opacity-100 border-white border py-3 px-4 bg-transparent placeholder:opacity-50"
              />
            </div>
          </div>

          {/* Resume Upload Block */}
          <div className="space-y-4 pt-6 border-t border-[#1C1C1C]">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <i className="hn hn-document"></i>
              Resume <span className="text-red-400">*</span>
            </h3>
            <p className="text-sm opacity-60">
              Upload your resume in PDF format (Max 2MB)
            </p>
            <ResumeUpload
              onUploadStart={() => setUploadingResume(true)}
              onUploadComplete={(url: string) => {
                setResumeUrl(url);
                setUploadingResume(false);
              }}
            />
          </div>

          {/* Dynamic Questions Block */}
          {role.questions && role.questions.length > 0 && (
            <DynamicQuestions
              questions={role.questions}
              answers={answers}
              onAnswerChange={handleAnswerChange}
            />
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!resumeUrl || uploadingResume || isPending}
              className="w-full font-medium border-2 border-white text-white py-3 px-6 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#6EFF63] hover:text-black hover:border-[#6EFF63] focus:bg-[#6EFF63] focus:text-black focus:border-[#6EFF63] active:scale-95"
            >
              {uploadingResume ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Uploading Resume...
                </span>
              ) : isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </span>
              ) : !resumeUrl ? (
                "Please Upload Resume to Continue"
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="hn hn-paper-plane"></i>
                  Submit Application
                </span>
              )}
            </button>
          </div>

          <p className="text-xs opacity-40 text-center mb-8">
            By submitting this form, you agree to our privacy policy.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
