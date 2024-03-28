"use client";
import { motion } from "framer-motion";
export function DeckCard({ color, i, user, portfolio }) {
  const x = (i - 2.5) * 50;
  const y = (i - 2.5) * -60;
  return (
    <motion.main
      initial={{ x: 0, y: 0, backgroundColor: color }}
      animate={{ x, y: y, transition: { delay: 0.2 } }}
      className={`absolute w-[70vw] max-w-[1000px] h-[50vh] flex flex-col justify-evenly p-10 space-y-5`}
    >
      <div className="max-h-[50%] min-w-[100%] flex-col responsiveHeading font-semibold overflow-hidden">
        <h1>{user.firstname}</h1>
        <h1 className="w-full flex justify-end">{user.lastname}</h1>
      </div>
      <div className="min-h-[50%] w-full flex-col items-center justify-between font-semibold">
        <div className="min-h-[50%] self-center w-full max-h-[120px] overflow-hidden responsiveText">
          {portfolio.aboutMe}
        </div>
        <div className="min-h-[50%] w-full flex justify-between items-center responsiveText">
          <div className="max-w-[50%] overflow-hidden">
            <p>[DECK]</p>
            <p className="opacity-60">{new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center justify-between min-w-[50%] space-x-4">
            <div className="max-w-[50%] overflow-hidden">
              <p>[MAIL]</p>
              <p className="opacity-60">{user.email}</p>
            </div>
            <div className="max-w-[50%] overflow-hidden">
              <p>[LINKEDIN]</p>
              <p className="opacity-60">{portfolio.socials.LinkedIn}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
