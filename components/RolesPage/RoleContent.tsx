"use client";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function RoleContentSkeleton() {
  return (
    <main className="flex-1 overflow-y-scroll">
      <div className="px-6 pr-8 mt-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-20"></div>
        
        <div className="flex flex-row mt-6 items-center justify-between">
          <div className="h-10 bg-white/10 rounded w-2/3"></div>
          <div className="h-6 w-6 bg-white/10 rounded"></div>
        </div>

        <div className="flex flex-col mt-7 ml-1">
          <div className="flex flex-row gap-10">
            <div className="h-5 bg-white/10 rounded w-24"></div>
            <div className="h-5 bg-white/10 rounded w-32"></div>
            <div className="h-5 bg-white/10 rounded w-28"></div>
          </div>
          <div className="h-5 bg-white/10 rounded w-36 mt-4"></div>
        </div>

        <div className="h-12 bg-white/10 rounded w-40 mt-10"></div>

        <div className="h-6 bg-white/10 rounded w-48 mt-10"></div>
        
        <div className="mt-4 mb-8 space-y-3">
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-11/12"></div>
          <div className="h-4 bg-white/10 rounded w-10/12"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-9/12"></div>
          <div className="h-4 bg-white/10 rounded w-11/12"></div>
          <div className="h-4 bg-white/10 rounded w-10/12"></div>
        </div>
      </div>
    </main>
  );
}

interface RoleContentProps {
  role: any;
  loading: boolean;
  currentSlug: string | null;
}

export default function RoleContent({ role, loading, currentSlug }: RoleContentProps) {
  useEffect(() => {
    if (role?.title) {
      // Set page title
      document.title = `${role.title} | CIA Labs`;
      
      // Create meta description
      const description = role.description?.substring(0, 155) || `Apply for ${role.title} position`;
      
      // Update or create meta tags
      const updateMetaTag = (property: string, content: string, isProperty = true) => {
        const attribute = isProperty ? 'property' : 'name';
        let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attribute, property);
          document.head.appendChild(element);
        }
        element.content = content;
      };

      // Basic meta tags
      updateMetaTag('description', description, false);
      
      // Open Graph tags
      updateMetaTag('og:title', role.title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:type', 'website');
      updateMetaTag('og:url', `${window.location.origin}/roles?slug=${role.slug}`);
      updateMetaTag('og:site_name', 'CIA Labs');
      
      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image', false);
      updateMetaTag('twitter:title', role.title, false);
      updateMetaTag('twitter:description', description, false);
    }
  }, [role, currentSlug]);

  if (!currentSlug) return <div className="p-6">Select a role</div>;
  if (loading) return <RoleContentSkeleton />;
  if (!role) return <div className="p-6">Role not found.</div>;

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/roles?slug=${role.slug}` : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: role.title,
          text: `Check out this role: ${role.title}`,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <main className="flex-1 overflow-y-scroll">
      <div className="lg:w-[60vw] w-full px-6 py-6 border-b border-[#1C1C1C] overflow-hidden">
        <a
          href="/"
          className="text-xs flex flex-row items-center gap-2 opacity-60 transition-all hover:opacity-95 active:opacity-100 focus-within:opacity-100"
        >
          <i className="hn hn-arrow-left"></i> Back
        </a>
        <div className="flex flex-row mt-6 items-center justify-between">
          <h1 className="text-4xl font-medium">{role.title}</h1>
          <i 
            className="hn hn-share text-2xl hover:text-[#6EFF63] hover:cursor-pointer transition-all"
            onClick={handleShare}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleShare()}
          ></i>
        </div>
        <div className="flex flex-col mt-7 opacity-60 ml-1">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
            <div className="flex flex-row items-center gap-2 font-medium">
              <i className="hn hn-calender text-lg"></i>
              {role.years.length === 0
                ? "Any Year"
                : role.years.join(", ") + " Year"}
            </div>
            <div className="flex flex-row items-center gap-2 w-fit">
              <i className="hn hn-receipt text-lg"></i>
              {role.branches.join(", ")}
            </div>
            <div className="flex flex-row items-center gap-2">
              <i className="hn hn-code text-lg"></i>
              {role.type.replaceAll("_", " ")}
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4">
            <i className="hn hn-clock text-lg"></i>
            {role.commitment}
          </div>
        </div>
        <a
          href={`/apply?slug=${role.slug}`}
          className="inline-block mt-10 text-black px-10 text-lg py-2 font-medium transition-all bg-[#6EFF63] border-[#087600] border-b-2 border-r-2 active:border-b-4 active:border-r-4 focus:border-b-4 focus:border-r-4 hover:border-b-4 hover:border-r-4"
        >
          Apply Now
        </a>
        <h1 className="mt-10 text-lg font-semibold">About the role</h1>
        <div className="mt-4 mb-8 opacity-60 markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {role.description}
          </ReactMarkdown>
        </div>
      </div>
    </main>
  );
}