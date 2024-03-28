import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export function FramerAnimateOV({ children, direction, className, delay, duration }) {
  let initalValues = { x: 0, y: 0 };
  switch (direction) {
    case "up":
      initalValues.y = 120;
      break;
    case "down":
      initalValues.y = -120;
      break;
    case "left":
      initalValues.x = -120;
      break;
    case "right":
      initalValues.x = 120;
      break;
    default:
      initalValues.x = 0;
      initalValues.y = 0;
      break;
  }
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ ...initalValues, opacity: 0 }}
      animate={
        isInView
          ? {
              x: 0,
              y: 0,
              opacity: 1,
              transition: {
                delay: delay || 0,
                duration: duration || 0.6,
                ease: [0.33, 1, 0.68, 1],
              },
            }
          : { ...initalValues, opacity: 0 }
      }
      className={className ? className : "text-xl"}
    >
      {children}
    </motion.div>
  );
}
