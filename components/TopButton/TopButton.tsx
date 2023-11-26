"use client";

import { useEffect, useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

const TopButton = () => {
  const [isScrolling, setIsscrolling] = useState<boolean>(false);

  const hoverMotion = {
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
    whileHover: { scale: 1.2 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsscrolling(true);
      } else {
        setIsscrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 스크롤 최상단으로 이동하는 핸들러함수
  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          {...hoverMotion}
          className="fixed bottom-7 right-7 z-50 bg-red-500 rounded-full p-3 shadow-2xl"
          onClick={handleButtonClick}
        >
          <BiUpArrow color="white" size={"23px"} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopButton;
