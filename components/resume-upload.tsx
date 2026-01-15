"use client"
import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import type { FileRouterType } from "@/app/api/uploadthing/core"

export function ResumeUpload({
  onUploadStart,
  onUploadComplete,
}: {
  onUploadStart: () => void
  onUploadComplete: (url: string) => void
}) {
  const [isUploaded, setIsUploaded] = useState(false)
  const [fileName, setFileName] = useState<string>("")
  const [uploadProgress, setUploadProgress] = useState(0)

  return (
    <div className="w-full">
      {isUploaded ? (
        <div className="w-full">
          <div className="border-dotted border border-white bg-transparent py-2 px-3 opacity-60 flex items-center justify-between">
            <span className="text-white text-sm truncate flex-1">
              ✓ {fileName || "Resume uploaded"}
            </span>
            <button
              onClick={() => {
                setIsUploaded(false)
                setFileName("")
                setUploadProgress(0)
              }}
              className="text-white text-xs underline hover:opacity-80 ml-2 flex-shrink-0 opacity-60"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <>
          <UploadButton<FileRouterType, "resumeUploader">
            endpoint="resumeUploader"
            onUploadBegin={() => {
              onUploadStart()
              setUploadProgress(0)
            }}
            onUploadProgress={(progress) => {
              setUploadProgress(progress)
            }}
            onClientUploadComplete={(res) => {
              const uploadedFile = res[0]
              setFileName(uploadedFile.name)
              setIsUploaded(true)
              setUploadProgress(100)
              onUploadComplete(uploadedFile.url)
            }}
            onUploadError={(err) => {
              alert(err.message)
              setUploadProgress(0)
            }}
            appearance={{
              button: {
                background: "transparent",
                border: "1px dotted white",
                color: "white",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
                opacity: "0.6",
                width: "100%",
              },
              container: {
                width: "100%",
              },
              allowedContent: {
                display: "none",
              },
            }}
            content={{
              button: uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : "Upload File",
              allowedContent: "",
            }}
            className="ut-button:hover:opacity-100 ut-button:hover:bg-white/5 ut-button:active:scale-95"
          />
          
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full mt-2 h-1 bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          
          <style jsx global>{`
            .ut-button {
              background: transparent !important;
              border: 1px dotted white !important;
              color: white !important;
              padding: 8px 16px !important;
              font-size: 14px !important;
              font-weight: 500 !important;
              cursor: pointer !important;
              transition: all 0.2s !important;
              opacity: 0.6 !important;
              width: 100% !important;
              border-radius: 0 !important;
            }
            
            .ut-button:hover {
              opacity: 1 !important;
              background: rgba(255, 255, 255, 0.05) !important;
            }
            
            .ut-button:active {
              transform: scale(0.95);
            }
            
            .ut-button:focus-visible {
              opacity: 1 !important;
              outline: 2px solid white !important;
              outline-offset: 2px !important;
            }
            
            .ut-allowed-content {
              display: none !important;
            }
            
            .ut-uploading {
              opacity: 0.5 !important;
              cursor: wait !important;
            }
            
            .ut-readying {
              opacity: 0.7 !important;
            }
          `}</style>
        </>
      )}
    </div>
  )
}