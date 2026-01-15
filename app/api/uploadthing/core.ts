import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

export const fileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "2MB" },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.url }
  }),
} satisfies FileRouter

export type FileRouterType = typeof fileRouter
