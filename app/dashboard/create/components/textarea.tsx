import { useRef } from "react";
import React, { useState, useEffect } from "react";

type Role = {
  id: string;
  title: string;
  slug: string;
  description: string;
  years: number[];
  branches: string[];
  type: string;
  descA: string;
  descB: string;
  commitment: string;
};

type Props = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
};
const prompt = (
  title: string,
  year: number[],
  branches: string[],
  commitment: string,
  short_desc: string,
) => {
  return `
# ${title} Role Description

Generate a **clear, professional, and realistic** role description with the following constraints:

## Candidate Eligibility
- **Year of study:** ${year}
- **Eligible branches:** ${branches}

## Commitment Details
- **Time commitment:** ${commitment}
## Short info
${short_desc}

## What to include
- A short role overview (no fluff)
- Key responsibilities (bullet points)
- Required skills (technical + soft skills if relevant)
- What the candidate will learn or gain
- Any expectations or evaluation criteria

## Tone & Style
- Concise
- Startup / student-driven
- No corporate buzzwords
- No emojis
- No motivational nonsense

Return the output in **Markdown (MDX-compatible)** format only.
`;
};

function Textareas({ role, setRole }: Props) {
  const [draftDescription, setDraftDescription] = useState("");
  const rightPanelRef = useRef<HTMLDivElement>(null);
  type Provider = "chatgpt" | "gemini";
  const [copied, setCopied] = useState<Provider | null>(null);
  const updateDescA = (value: string) => {
    setRole((prev) => ({
      ...prev,
      descA: value,
      description: `${value}${prev.descB}`,
    }));
  };

  const updateDescB = (value: string) => {
    setRole((prev) => ({
      ...prev,
      descB: value,
      description: `${prev.descA}${value}`,
    }));
  };
  const handleClick = async (which: Provider) => {
    if (copied) return;

    await navigator.clipboard.writeText(
      prompt(
        role.title,
        role.years,
        role.branches,
        role.commitment,
        role.description,
      ),
    );

    setCopied(which);

    const url =
      which === "chatgpt"
        ? "https://chatgpt.com"
        : "https://gemini.google.com/";

    setTimeout(() => {
      window.open(url, "_blank");
      setCopied(null); // reset after redirect
    }, 800);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setRole((prev) => ({
        ...prev,
        description: draftDescription,
      }));
    }, 150);

    return () => clearTimeout(t);
  }, [draftDescription]);
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm opacity-60 mb-2">
          Description <span className="text-red-400">*</span>
        </label>

        <textarea
          name="description"
          rows={3}
          maxLength={200}
          value={role.descA}
          onChange={(e) => updateDescA(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;

            // Auto-grow textarea
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;

            // Update state

            // Auto-scroll parent
            requestAnimationFrame(() => {
              if (rightPanelRef.current) {
                rightPanelRef.current.scrollTop =
                  rightPanelRef.current.scrollHeight;
              }
            });
          }}
          className="w-full resize-none overflow-hidden border border-dotted border-white/60 bg-transparent px-4 py-3 opacity-60 outline-none transition-all focus:opacity-100 placeholder:opacity-50"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm opacity-60 mb-2">
          MDX Description <span className="text-red-400">*</span>
        </label>

        <textarea
          name="description"
          rows={3}
          value={role.descB}
          onChange={(e) => updateDescB(e.target.value)}
          onInput={(e) => {
            const el = e.currentTarget;

            // Auto-grow textarea
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;

            // Auto-scroll parent
            requestAnimationFrame(() => {
              if (rightPanelRef.current) {
                rightPanelRef.current.scrollTop =
                  rightPanelRef.current.scrollHeight;
              }
            });
          }}
          className="w-full resize-none overflow-hidden border border-dotted border-white/60 bg-transparent px-4 py-3 opacity-60 outline-none transition-all focus:opacity-100 placeholder:opacity-50"
        />
        <div className="flex flex-row gap-10 mt-2">
          <button
            onClick={() => handleClick("chatgpt")}
            className={`text-xs cursor-pointer transition-all duration-300
      ${copied === "chatgpt" ? "opacity-100" : "opacity-60 hover:opacity-100"}
    `}
          >
            {copied === "chatgpt" ? "Prompt copied ✓" : "Open ChatGPT"}
          </button>

          <button
            onClick={() => handleClick("gemini")}
            className={`text-xs cursor-pointer transition-all duration-300
      ${copied === "gemini" ? "opacity-100" : "opacity-60 hover:opacity-100"}
    `}
          >
            {copied === "gemini" ? "Prompt copied ✓" : "Open Gemini"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Textareas;
