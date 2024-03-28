import { FramerAnimateOV } from "./TextAppers";
export function StaggerChildren({ children, delay, className, direction }) {
  return (
    <FramerAnimateOV className={className} delay={delay * 0.1} direction={direction || "up"}>
      {children}
    </FramerAnimateOV>
  );
}
