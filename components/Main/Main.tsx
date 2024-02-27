"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useCursorTracker } from "@/hooks/useCursorTracker";
import Link from "next/link";
import { LuPhoneCall } from "react-icons/lu";
import { SiKakaotalk } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CustomTypewriter from "./CustomTypewriter";
import { information } from "@/const/information.const";

const Main: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cursorPosition = useCursorTracker(targetRef);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleHoverChange = (newIsHovered: boolean): boolean => {
    setIsHovered(newIsHovered);
    return true;
  };

  const navigateToBusiness = () => {
    // '/#business'로 구역으로 이동
    router.push("/#business");
  };

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

  // 호버시 모션 효과
  const hoverMotion = {
    whileHover: { scale: 1.1 },
  };

  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center overflow-hidden cursor-none"
      id="home"
      ref={targetRef}
    >
      <section className="flex justify-center flex-col absolute top-[22%] xs:top-[24%] left-[15%] w-[70%] text-white">
        <h1 className="text-[1.35rem] xs:text-[3.2rem] font-bold">
          고철, 비철, 기계철, 폐전선, 동 <br /> 철거전문
          <span className="font-normal"> 업체</span> <br />
          <span className="font-normal">
            <CustomTypewriter />
          </span>
        </h1>
        <div className="flex justify-between">
          <h2 className="mt-10 xs:mt-3 text-[1.2rem] xs:text-[1.4rem]">
            - 수도권 전지역 무료 출장
            <br />- 상담 및 견적 대환영
          </h2>
          <div className="hidden lg:flex flex-col text-[1.4rem] xs:text-[1.7rem] mt-5 pr-48">
            <span className="font-bold text-center">매입품목</span>
            <span className="mt-1 text-[1.3rem]">
              - 공장 / 관공서, 고철, 비철
            </span>
            <span className="mt-1 text-[1.3rem]">
              - 철거공사, 폐기물처리 등
            </span>
            <motion.button
              initial="rest"
              animate="rest"
              whileHover="hover"
              className="relative overflow-hidden mt-1 p-1 rounded-md text-[1.1rem]"
              onClick={navigateToBusiness}
              onMouseEnter={() => handleHoverChange(true)}
              onMouseLeave={() => handleHoverChange(false)}
            >
              <motion.div
                variants={buttonVariants}
                className="absolute inset-0 bg-gray-50 "
              />
              View Detail<span className="px-1 pt-2 text-[1.5rem]">⇀</span>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row w-full justify-start text-[1.4rem] xs:text-[1.7rem] -m-3">
          <div className="flex flex-col m-2 mt-20 xs:mt-5 font-bold">
            <span className="ml-2"> 매입문의 & 견적상담 </span>
            <div className="flex flex-col text-[1.3rem] font-normal">
              <motion.div {...hoverMotion} className="flex items-center m-2">
                <LuPhoneCall className="mr-2" />
                <a
                  href="tel:+0319046189"
                  onMouseEnter={() => handleHoverChange(true)}
                  onMouseLeave={() => handleHoverChange(false)}
                >
                  031-904-6189
                </a>
              </motion.div>
              <motion.div {...hoverMotion} className="flex items-center m-2">
                <BsPhoneVibrate className="mr-2" />
                <a
                  href={`tel:+82${information.phone}`}
                  onMouseEnter={() => handleHoverChange(true)}
                  onMouseLeave={() => handleHoverChange(false)}
                >
                  {information.phone}
                </a>
              </motion.div>

              <motion.div {...hoverMotion} className="flex items-center m-2">
                <SiKakaotalk className="mr-2" />
                <a
                  href="https://open.kakao.com/me/topgame"
                  target="_blank"
                  onMouseEnter={() => handleHoverChange(true)}
                  onMouseLeave={() => handleHoverChange(false)}
                >
                  탑개미자원
                </a>
              </motion.div>
              <div className="block xs:hidden font-bold mt-10 ml-2">
                <Link href="#inquiry">
                  온라인 상담신청 하기{" "}
                  <span className="px-1 pt-2 text-[1.5rem]">⇀</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 모바일에서 보여지는 배경 */}
      {/* <Image
        src={background}
        alt="background"
        className="block xs:hidden absolute w-screen h-screen top-0 left-0 z-[-1] object-cover pointer-events-none"
        style={{ filter: "brightness(50%)" }}
        quality={100}
      /> */}
      {/* 웹에서 보여지는 배경 */}
      <video
        ref={videoRef}
        className="absolute w-screen h-screen top-0 left-0 z-[-1] object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        style={{ filter: "brightness(50%)" }}
      >
        <source src={"/video.mp4"} type="video/mp4" />
      </video>

      <div
        className={`maincursor hidden w-[6.5em] h-[6.5em] bg-gray-50 rounded-full uppercase lg:flex justify-center items-center font-bold absolute pointer-events-none duration-[60ms] ease-linear ${
          isHovered === true ? "opacity-25" : "opacity-100"
        }`}
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      >
        {isHovered === false ? (
          <p>
            각종 철, 종이 <br /> 최고가 매입
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Main;
