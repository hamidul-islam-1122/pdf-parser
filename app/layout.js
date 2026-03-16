import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "pdf ai",
  description: "pdf parser",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
  
        {children}
      {/* <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@5.5.207/+esm"></script> */}
      </body>
    </html>
  );
}
