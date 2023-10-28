"use client";

import { useEffect, useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { motion } from "framer-motion";

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
      if (window.scrollY > 300) {
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
    <motion.div
      {...hoverMotion}
      className={` ${
        isScrolling
          ? "fixed bottom-7 right-7 z-50 bg-gray-600 rounded-full p-3 shadow-2xl"
          : ""
      }`}
      onClick={handleButtonClick}
    >
      <BiUpArrow color="white" size={"23px"} />
    </motion.div>
  );
};

export default TopButton;
