"use client"

import { useState } from "react"
import { apply } from "@/app/actions/apply"
import { ResumeUpload } from "@/components/resume-upload"
import React from "react"

export default function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const { slug } = React.use(params)

  return (
    <form action={apply} className="space-y-4 max-w-md">
      {/* hidden role identifier */}
      <input type="hidden" name="roleSlug" value={slug} />

      <input
        name="name"
        placeholder="Full Name"
        required
        className="border p-2 w-full"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2 w-full"
      />

      <input
        name="phone"
        placeholder="Phone (optional)"
        className="border p-2 w-full"
      />

      {/* Resume Upload */}
      <div>
        <p className="text-sm mb-1">Upload Resume (PDF only)</p>

        <ResumeUpload
          onUploadStart={() => setUploading(true)}
          onUploadComplete={(url: string) => {
            setResumeUrl(url)
            setUploading(false)
          }}
        />
      </div>

      {/* store resume URL */}
      <input type="hidden" name="resumeUrl" value={resumeUrl ?? ""} />

      <button
        type="submit"
        disabled={!resumeUrl || uploading}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        Apply
      </button>
    </form>
  )
}
