"use client";

import { useState } from "react";

type QuestionType = "text" | "textarea" | "url";

export type Question = {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  placeholder?: string;
};

export default function QuestionBuilder({
  value,
  onChange,
}: {
  value: Question[];
  onChange: (q: Question[]) => void;
}) {
  function update(index: number, patch: Partial<Question>) {
    const copy = [...value];
    copy[index] = { ...copy[index], ...patch };
    onChange(copy);
  }

  function addQuestion() {
    onChange([
      ...value,
      {
        id: `q${value.length + 1}`,
        type: "textarea",
        label: "",
        required: false,
      },
    ]);
  }

  function remove(index: number) {
    const copy = [...value];
    copy.splice(index, 1);
    onChange(copy);
  }

  return (
    <div className="space-y-4">
      {value.map((q, i) => (
        <div
          key={q.id}
          className="border border-white/20 p-4 rounded space-y-3"
        >
          <input
            className="w-full border border-white/20 p-2 rounded"
            placeholder="Question label"
            value={q.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />

          <div className="flex gap-2 flex-wrap">
            <select
              className="border border-white/20 p-2 rounded"
              value={q.type}
              onChange={(e) =>
                update(i, { type: e.target.value as QuestionType })
              }
            >
              <option value="text">Short Text</option>
              <option value="textarea">Long Text</option>
              <option value="url">URL</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={q.required}
                onChange={(e) => update(i, { required: e.target.checked })}
              />
              Required
            </label>
          </div>

          <input
            className="w-full border border-white/20 p-2 rounded"
            placeholder="Placeholder (optional)"
            value={q.placeholder ?? ""}
            onChange={(e) => update(i, { placeholder: e.target.value })}
          />

          <button
            type="button"
            onClick={() => remove(i)}
            className="text-red-500 text-sm"
          >
            Remove question
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="border border-white/20 px-4 py-2 rounded"
      >
        + Add Question
      </button>
    </div>
  );
}
