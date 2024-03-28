import { motion, useInView, useScroll, useMotionTemplate, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
export function Perspective({ className, src, height, width, perspective, deg }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [deg || 45, 0]);
  return (
    <motion.div
      style={{ perspective }}
      className={`relative min-h-[70vh]  md:min-h-[100vh] min-w-[80vw] max-h-[70vh] sm:max-h-[100vh] max-w-[80vw] perspective-origin-center flex flex-col items-center justify-center`}
    >
      <motion.div
        style={{ rotateX }}
        className={`absolute aspect-video min-h-[70vh]  md:min-h-[100vh] min-w-[80vw] max-h-[70vh] sm:max-h-[100vh] max-w-[80vw] overflow-hidden transform-style-3d flex items-center justify-center ${className}`}
      >
        <Image
          ref={ref}
          src={src}
          height={1000}
          width={1000}
          alt="image"
          className="rounded-xl object-cover min-h-[70vh]  md:min-h-[100vh] min-w-[80vw] max-h-[70vh] sm:max-h-[100vh] max-w-[80vw]"
        />
      </motion.div>
    </motion.div>
  );
}
