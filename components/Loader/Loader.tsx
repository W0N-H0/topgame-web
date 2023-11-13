"use client";
import { motion } from "framer-motion";

const loader = {
  initial: {
    translateY: "0",
  },
  animate: {
    translateY: "-100vh",
  },
  exit: {
    translateY: "-100vh",
  },
};
const loaderHeader = {
  initial: {
    opacity: 1,
    translateY: "0vh",
  },
  animate: {
    opacity: 1,
    translateY: "-50vh",
  },
  exit: {
    translateY: "-50vh",
  },
};

const Loader: React.FC<{ isAboutPage: boolean }> = ({ isAboutPage }) => {
  return (
    <motion.div
      variants={loader}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        delay: 0.8,
        duration: 0.15,
        ease: [0.42, 0, 0.58, 1],
      }}
      className="w-screen h-screen flex justify-center items-center absolute top-0 left-0 transition-all duration-700 bg-white z-[3]"
    >
      <h1 className="text-[8vw]">
        <p className="font-bold leading-tight">
          {isAboutPage ? (
            <>업체 소개</>
          ) : (
            <>
              탑개미자원<span className="text-[3vw]">®</span>
            </>
          )}
        </p>
        <motion.div
          variants={loaderHeader}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1], delay: 0.4 }}
          className="bg-white w-full h-[55%] absolute"
        />
      </h1>
    </motion.div>
  );
};

export default Loader;
