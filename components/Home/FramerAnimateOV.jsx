import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export function FramerAnimateOV({ children, direction, className }) {
  let initalValues = { x: 0, y: 0 };
  switch (direction) {
    case "up":
      initalValues.y = 120;
      console.log("Happeneing");
      break;
    case "down":
      initalValues.y = -120;
      console.log("Happeneing");
      break;
    case "left":
      initalValues.x = -120;
      console.log("Happeneing");
      break;
    case "right":
      initalValues.x = 120;
      console.log("Happeneing");
      break;
    default:
      initalValues.x = 0;
      initalValues.y = 0;
      console.log("Happeneing");
      break;
  }
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <motion.h1
      ref={ref}
      initial={{ ...initalValues, opacity: 0 }}
      animate={
        isInView
          ? {
              x: 0,
              y: 0,
              opacity: 1,
              transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            }
          : { ...initalValues, opacity: 0 }
      }
      className={className ? className : "text-xl text-center"}
    >
      {children}
    </motion.h1>
  );
}
