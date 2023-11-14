"use client";
import { useCursorTracker } from "@/hooks/useCursorTracker";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import BusinessItems from "./BusinessItems";

const Business: React.FC = () => {
  const targetRef = useRef(null);
  const cursorPosition = useCursorTracker(targetRef);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const motionRef = useRef(null);
  const isInView = useInView(motionRef);

  const handleHoverChange = (newIsHovered: boolean): boolean => {
    setIsHovered(newIsHovered);
    return true;
  };

  return (
    <>
      <motion.main
        id="business"
        ref={motionRef}
        initial={{ x: "-30vw" }}
        animate={{ x: isInView ? 0 : "-30vw" }}
        transition={{ duration: 0.75 }}
        className="w-screen pb-[4vw] px-[5.4vw] xl:px-[8em] mt-[0.001em]"
      >
        <section className="hidden mb-[6em] h-[0.05em] w-full bg-black"></section>

        <section className="mb-[3em] md:mb-[5em]">
          <h1 className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold mt-[1.5em]">
            Purchase <br /> items
          </h1>
        </section>

        <section
          ref={targetRef}
          className="flex justify-center items-center cursor-none"
        >
          <BusinessItems
            isHovered={isHovered}
            onHoverChange={handleHoverChange}
          />
          <div
            className={`hidden w-[6em] h-[6em] bg-[#f4c6ae] rounded-full uppercase lg:flex justify-center items-center font-bold absolute pointer-events-none duration-[50ms] ease-linear ${
              isHovered === true ? "opacity-25" : "opacity-100"
            }`}
            style={{
              transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
            }}
          >
            {isHovered === false ? "Drag" : ""}
          </div>
        </section>
      </motion.main>
    </>
  );
};

export default Business;
