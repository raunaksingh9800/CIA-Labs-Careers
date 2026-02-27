import "./globals.css";
import "@hackernoon/pixel-icon-library/fonts/iconfont.css";
import { Inter, Edu_NSW_ACT_Cursive } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppShell from "@/components/AppShell";
// app/layout.tsx or globals.css
import "@mdxeditor/editor/style.css";


const inter = Inter({ subsets: ["latin"] });
const edu = Edu_NSW_ACT_Cursive({
  subsets: ["latin"],
  fallback: ["cursive", "sans-serif"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.className} ${edu.className}`}>
        <body>
          <AppShell>{children}</AppShell>
        </body>
      </html>
    </ClerkProvider>
  );
}
