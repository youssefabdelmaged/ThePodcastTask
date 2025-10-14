import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Podcastr - O melhor para você ouvir, sempre",
  description: "A modern podcast platform with the best content",
  keywords: ["podcast", "audio", "streaming", "discovery"],
  authors: [{ name: "Podcastr Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
            </main>
          </div>

          {/* Audio Player Sidebar */}
          <AudioPlayer />
        </div>
      </body>
    </html>
  );
}
