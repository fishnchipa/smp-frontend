import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

const inter = Inter({ subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Solve My Physics",
  description: "Solve My Physics is an interactive e-learning platform designed to make learning physics engaging and accessible for students of all levels. The app offers a comprehensive curriculum, covering topics ranging from classical mechanics to modern physics. Through a blend of videos, quizzes, and interactive simulations, users are able to visualize and understand complex physics concepts in a more intuitive way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <NextTopLoader /> 
        {children}
      </body>
    </html>
  );
}


