"use client";
import MusicBackground from "@/components/MusicBackground";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import Image from "next/image";
import AnimatedCursor from "react-animated-cursor";

const myFont = localFont({
  src: "./dragon-hunter.otf",
  display: "swap",
});

export default function Home() {
  return (
    <>
      <MusicBackground />
      <main
        className="flex flex-col items-center min-h-screen justify-end gap-5 p-24"
        style={{
          backgroundImage: `url('/images/bg-hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className={`text-4xl text-white font-bold ${myFont.className}`}>
          digital odyssey
        </h1>
        <h1 className="text-6xl text-white font-bold">
          The Canonical Chronicles
        </h1>
        <h1
          className={`text-2xl text-black font-bold px-14 py-3 ${myFont.className}`}
          style={{
            backgroundImage: `url('/images/btn-background.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "filter 0.3s",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
            ((e.target as HTMLHeadingElement).style.filter = "brightness(0.8)")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) =>
            ((e.target as HTMLHeadingElement).style.filter = "brightness(1)")
          }
        >
          play games
        </h1>
      </main>
      <AnimatedCursor
        innerSize={10}
        outerSize={45}
        innerScale={1}
        outerScale={2}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: "white",
        }}
        outerStyle={{
          border: "3px solid white",
        }}
      />
    </>
  );
}
