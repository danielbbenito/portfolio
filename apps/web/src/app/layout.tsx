import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { ConsentBar } from "@/components/ConsentBar";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

// Archivo is a variable font: one file covers every weight (100–900)
// and, with the "wdth" axis, every width from condensed (62) to wide (125).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// For labels, metadata and figure captions.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel B. Benito — Portfolio",
  description: "Unity/C# systems developer moving into full-stack product engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentBar />
      </body>
    </html>
  );
}
