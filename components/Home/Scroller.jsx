"use client";
import port1 from "@/public/port1.png";
import port2 from "@/public/port2.png";
import port3 from "@/public/port3.png";
import port4 from "@/public/port4.png";
import port5 from "@/public/port5.png";
import port6 from "@/public/port6.png";
import port7 from "@/public/port7.png";
import port8 from "@/public/port8.png";
import port9 from "@/public/port9.png";
import port10 from "@/public/port10.png";
import port11 from "@/public/port11.png";
import port12 from "@/public/port12.png";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
export default function HomeScroller() {
  const templateArrayL = [port1, port2, port3, port4, port5, port6];
  const templateArrayR = [port7, port8, port9, port10, port11, port12];
  return (
    <div className="space-y-6 min-w-full">
      <Scroller images={templateArrayL} direction={"L"} />
      <Scroller images={templateArrayR} direction={"R"} />
    </div>
  );
}

export function Scroller({ images, direction }) {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let x = useTransform(scrollYProgress, [0, 1], direction === "R" ? [0, 150] : [0, -150]);
  return (
    <motion.div
      style={{ x }}
      ref={ref}
      className="flex max-h-[210px] min-w-full items-center justify-center space-x-6 z-10"
    >
      {images.map((name, i) => {
        return (
          <Image
            key={i}
            className={`rounded-xl hover:scale-105 duration-300 w-[calc(100vw/5)]`}
            src={name.src}
            alt="pic"
            height={500}
            width={500}
            quality={50}
          />
        );
      })}
    </motion.div>
  );
}
