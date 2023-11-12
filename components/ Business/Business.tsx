"use client";
import { useCursorTracker } from "@/hooks/useCursorTracker";
import { useRef, useState, useEffect } from "react";
import BusinessItems from "./BusinessItems";

const Business: React.FC = () => {
  const targetRef = useRef(null);
  const cursorPosition = useCursorTracker(targetRef);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHoverChange = (newIsHovered: boolean): boolean => {
    setIsHovered(newIsHovered);
    return true;
  };

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);

  return (
    <>
      <main className="w-screen pb-[4vw] px-[5.4vw] xl:px-[8em]">
        <section className="mb-[6em] h-[0.05em] w-full bg-black"></section>

        <section className="mb-[3em] md:mb-[5em]">
          <h1 className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold mt-[1.5em]">
            Purchase <br /> items
          </h1>
        </section>

        <section
          className="flex justify-center items-center cursor-none"
          ref={targetRef}
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
      </main>
    </>
  );
};

export default Business;
