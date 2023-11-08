"use client";
import { useRef } from "react";
import Image from "next/image";
import { useCursorTracker } from "@/hooks/useCursorTracker";
import background from "@/public/background2.jpg";
import { LuPhoneCall } from "react-icons/lu";
import { SiKakaotalk } from "react-icons/si";

const Main: React.FC = () => {
  const targetRef = useRef(null);
  const cursorPosition = useCursorTracker(targetRef);
  return (
    <div
      className="w-screen h-screen relative flex justify-center items-center overflow-hidden cursor-none"
      ref={targetRef}
    >
      <section className="flex flex-col absolute top-[25%] left-[15%] w-[70%] text-white">
        <h1 className="text-[3rem] font-bold">
          고철, 비철, 기계철, 폐전선 등 <br /> 철거전문{" "}
          <span className="font-normal">업체</span> <br />
          탑개미자원 <br />
        </h1>
        <h2 className="mt-3 text-[1rem] xs:text-[1.2rem]">
          - 수도권 전지역 무료 출장
          <br />- 상담 및 견적 대환영
        </h2>
        <div className="flex w-full justify-start xs:justify-between text-[1.5rem]">
          <div className="flex flex-col m-2  mt-20">
            <span className="ml-2"> 매입문의 & 견적상담 </span>
            <div className="flex flex-col">
              <div className="flex items-center m-2">
                <LuPhoneCall className="mr-2" /> 010-4007-8524
              </div>
              <div className="flex items-center m-2">
                <SiKakaotalk className="mr-2" /> 탑개미자원
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-[1.7rem] font-bold -mt-20">
            <p className="text-center">주요업무</p>
            <div className="flex flex-col">
              <span>공장 고철 비철 매입 전문 - 공장 거래처 전문입니다.</span>
              <span>1</span>
              <span>1</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </section>
      <Image
        src={background}
        alt="background"
        className="absolute w-screen h-screen top-0 left-0 z-[-1] object-cover pointer-events-none"
        style={{ filter: "brightness(70%)" }}
        quality={100}
      />

      <div
        className="flex justify-center items-center bg-gray-50 rounded-full w-[6rem] h-[6rem] p-2 uppercase text-center text-[0.9rem] font-bold leading-tight duration-[50ms] ease-linear maincursor"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      >
        <p>
          010 <br />
          3351
          <br />
          6450
        </p>
      </div>
    </div>
  );
};

export default Main;
