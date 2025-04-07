"use client";

import { motion } from "framer-motion";
import React from "react";
import BlurIn from "@/components/magicui/blur-in";
import AnimatedImage from "@/components/AnimatedImage";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Brain } from "lucide-react";

import Navbar from "@/components/navbar";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Hero() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="z-0 relative min-h-screen w-full overflow-hidden">
        <motion.div
          className="relative z-10 flex flex-col items-center justify-start min-h-screen space-y-4 px-4 pt-32 pb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DotPattern
            className={cn(
              "absolute inset-0 z-0 [mask-image:radial-gradient(50vw_circle_at_center,white,transparent)] dark:[mask-image:radial-gradient(50vw_circle_at_center,black,transparent)]"
            )}
          />
          <p className="flex items-center mb-6 border border-neutral-300 rounded-3xl text-xs px-3 py-[3px] shadow-[3px_3px_0px_0px_rgb(143,143,143)]">
            <Brain className="me-[5px] h-3 w-3" />
            Remember Smarter
          </p>
          <motion.div variants={itemVariants}>
            <BlurIn
              word={
                <>
                  <span>Watch. Read. </span>
                  <br />
                  <SparklesText className="inline" text="Remember." />
                  <span> Repeat</span>
                </>
              }
              className="font-display text-center text-4xl font-bold w-full lg:w-auto max-w-4xl mx-auto -z-10"
              duration={1}
            />
          </motion.div>
          <motion.h2
            className="text-xl text-muted-foreground tracking-normal text-center max-w-2xl mx-auto z-10"
            variants={itemVariants}
          >
            Upload course videos and PDFs, we'll create personalized MCQs and
            send them to you on WhatsApp to help you{" "}
            <NumberTicker value={100} />% retain what you learn.
          </motion.h2>
          <motion.div variants={itemVariants} className="z-20">
            <Link href="/dashboard">
              <button className="btn-primary">Get Started</button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <AnimatedImage
              src="/dummy.svg"
              alt="Image"
              width={1200}
              height={900}
              className="w-full h-auto max-w-6xl mx-auto rounded-2xl shadow-lg px-0 sm:px-4"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
