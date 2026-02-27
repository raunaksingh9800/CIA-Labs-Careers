import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

interface QuestionSchema {
  id: string;
  type: string;
  label: string;
  required: boolean;
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== "super-admin") {
    return <div className="p-10 text-red-500 font-bold uppercase tracking-widest">Unauthorized Access</div>;
  }

  const application = await prisma.application.findUnique({
    where: { id },
    include: { role: true },
  });

  if (!application) notFound();

  // 1. SAFE PARSING (Logic preserved from your working version)
  const schema = (application.role.questions as unknown as QuestionSchema[]) || [];
  let answers: Record<string, string> = {};

  if (typeof application.answers === "string") {
    try {
      answers = JSON.parse(application.answers);
    } catch (e) {
      answers = {};
    }
  } else if (typeof application.answers === "object" && application.answers !== null) {
    answers = application.answers as Record<string, string>;
  }

  const schemaIds = new Set(schema.map((q) => q.id));
  const orphanedKeys = Object.keys(answers).filter((key) => !schemaIds.has(key));

  return (
    <div className="min-h-screen bg-black overflow-y-scroll  px-10 font-sans selection:bg-white w-full selection:text-black">
      <div className="w-[90vw] ">
        
        {/* HEADER */}
        <div className="flex flex-col gap-6">
          <Link
            href="/super-admin"
            className="text-[10px] font-bold tracking-widest text-neutral-500 hover:text-white transition-colors w-fit border border-neutral-800 px-3 py-1 rounded-full bg-neutral-900/50"
          >
            ← BACK TO LIST
          </Link>
          <div className="border-b border-neutral-800 pb-8">
            <h1 className="text-4xl font-bold mb-3 tracking-tighter">{application.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase bg-white text-black px-2 py-0.5 font-bold rounded">
                {application.role.title}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-tighter">
                ID: {application.id.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        {/* CORE DETAILS GRID (Email, Phone, Resume, etc.) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between">
            <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Email Address</label>
            <p className="text-sm font-medium truncate">{application.email}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between">
            <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Phone Number</label>
            <p className="text-sm font-medium">{application.phone || "Not Provided"}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between">
            <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Applied On</label>
            <p className="text-sm font-medium font-mono">{new Date(application.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/20 border border-neutral-800 flex flex-col justify-between group">
            <label className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Resume / Portfolio</label>
            {application.resumeUrl ? (
              <a
                href={application.resumeUrl}
                target="_blank"
                className="text-xs bg-white text-black text-center py-1.5 rounded-lg font-bold hover:bg-neutral-200 transition-colors"
              >
                View Document
              </a>
            ) : (
              <p className="text-xs text-neutral-600 italic">No Link</p>
            )}
          </div>
        </section>

        {/* DYNAMIC RESPONSES SECTION */}
        <section className="pt-6 space-y-8">
          <h2 className="text-2xl font-bold italic tracking-tight border-l-2 border-white pl-4">
            Application Questionnaire
          </h2>

          <div className="space-y-8">
            {/* PASS 1: RENDER MATCHED QUESTIONS */}
            {schema.map((question) => {
              const userAnswer = answers[question.id];
              return (
                <div key={question.id} className="group animate-in fade-in slide-in-from-bottom-2">
                  <h3 className="text-xs text-neutral-400 mb-3 font-semibold uppercase tracking-wide">
                    {question.label}
                  </h3>
                  <div className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-sm text-neutral-200 leading-relaxed shadow-sm group-hover:border-neutral-700 transition-all">
                    {userAnswer ? (
                      question.type === "url" ? (
                        <a
                          href={userAnswer.startsWith('http') ? userAnswer : `https://${userAnswer}`}
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30"
                        >
                          {userAnswer} ↗
                        </a>
                      ) : (
                        <span className="whitespace-pre-wrap">{userAnswer}</span>
                      )
                    ) : (
                      <span className="text-neutral-600 italic">Answer left blank</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* PASS 2: ORPHANED DATA */}
            {orphanedKeys.length > 0 && (
              <div className="mt-12 pt-12 border-t border-dashed border-neutral-800">
                <div className="flex items-center gap-2 mb-6">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                    <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
                        Data Mismatch / Old Form Data
                    </h3>
                </div>
                {orphanedKeys.map((key) => (
                  <div key={key} className="mb-6">
                    <h3 className="text-[10px] text-neutral-600 mb-2 font-mono font-bold">FIELD_ID: {key}</h3>
                    <div className="p-4 rounded-xl bg-orange-900/5 border border-orange-500/10 text-sm text-neutral-300">
                      {String(answers[key])}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER ACTION */}
        <div className="pt-10 border-t border-neutral-900 flex justify-center">
             <button className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors uppercase font-bold tracking-widest">
                End of Application
             </button>
        </div>
      </div>
    </div>
  );
}