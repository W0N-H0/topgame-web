"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useCursorTracker } from "@/hooks/useCursorTracker";
import background from "@/public/background.png";
import { LuPhoneCall } from "react-icons/lu";
import { SiKakaotalk } from "react-icons/si";
import { motion } from "framer-motion";

const Main: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cursorPosition = useCursorTracker(targetRef);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // 재생 속도 설정
      videoElement.playbackRate = 0.7;
    }
  }, []);

  // 버튼 애니메이션 효과
  const buttonVariants = {
    rest: { height: 0, opacity: 1 },
    hover: { height: "auto", opacity: 0.7, color: "black" },
  };

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center overflow-hidden "
      id="home"
      ref={targetRef}
    >
      <section className="flex flex-col absolute top-[24%] left-[15%] w-[70%] text-white">
        <h1 className="text-[1.6rem] xs:text-[3.2rem] font-bold">
          고철, 비철, 기계철, 폐전선, 동 <br /> 철거전문
          <span className="font-normal"> 업체</span> <br />
          <span className="text-[3.7rem]">탑</span>개미자원
          <span className="font-normal">입니다.</span>
        </h1>
        <div className="flex justify-between">
          <h2 className="mt-10 xs:mt-3 text-[1.2rem] xs:text-[1.4rem]">
            - 수도권 전지역 무료 출장
            <br />- 상담 및 견적 대환영
          </h2>
          <div className="hidden lg:flex flex-col text-[1.4rem] xs:text-[1.7rem] mt-5 pr-48">
            <span className="font-bold text-center">매입품목</span>
            <span className="mt-1 text-[1.1rem]">
              - 공장 / 관공서, 고철, 비철
            </span>
            <span className="mt-1 text-[1.1rem]">
              - 철거공사, 폐기물처리 등
            </span>
            <motion.button
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="relative overflow-hidden mt-1 p-1 rounded-md text-[1.1rem]"
            >
              <motion.div
                variants={buttonVariants}
                className="absolute inset-0 bg-gray-50 "
              />
              View Detail<span className="px-1 pt-2 text-[1.5rem]">⇀</span>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row w-full justify-start text-[1.4rem] xs:text-[1.7rem]">
          <div className="flex flex-col m-2 mt-10 xs:mt-5 font-bold">
            <span className="ml-2"> 매입문의 & 견적상담 </span>
            <div className="flex flex-col text-[1.3rem] font-normal">
              <div className="flex items-center m-2">
                <LuPhoneCall className="mr-2" /> 010-4007-8524
              </div>
              <div className="flex items-center m-2">
                <SiKakaotalk className="mr-2" /> 탑개미자원
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 모바일에서 보여지는 배경 */}
      <Image
        src={background}
        alt="background"
        className="block xs:hidden absolute w-screen h-screen top-0 left-0 z-[-1] object-cover pointer-events-none"
        style={{ filter: "brightness(50%)" }}
        quality={100}
      />
      {/* 웹에서 보여지는 배경 */}
      <video
        ref={videoRef}
        className="hidden xs:block absolute w-screen h-screen top-0 left-0 z-[-1] object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: "brightness(50%)" }}
      >
        <source src={"/video.mp4"} type="video/mp4" />
      </video>

      {/* 커스텀 커서 main 페이지 일시 보류 */}
      {/* <div
        className="hidden xs:flex justify-center items-center bg-gray-50 rounded-full w-[6rem] h-[6rem] p-2 uppercase text-center text-[0.9rem] font-bold leading-tight duration-[70ms] maincursor "
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      >
        <p>
          010 <br />
          4007
          <br />
          8524
        </p>
      </div> */}
    </div>
  );
};

export default Main;
