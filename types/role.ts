export type Question = {
  id: string;
  type: "text" | "textarea" | "url" | "email" | "number" | "tel";
  label: string;
  required: boolean;
  placeholder?: string;
};

export type Role = {
  title: string;
  slug: string;
  description: string;
  years: number[];
  branches: string[];
  type: string;
  commitment: string;
  questions?: Question[];
};