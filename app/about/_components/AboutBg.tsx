import Image from "next/image";
import { NextPage } from "next";
import background from "@/public/aboutBg.jpg";

const AboutBg: NextPage = () => {
  return (
    <section className="w-screen h-[40vh] xs:h-[55vh] relative flex justify-center items-center">
      <div className="flex flex-col absolute top-[50%] xs:top-[40%] left-[15%] w-[70%] text-white">
        <h1 className="text-[2rem] xs:text-[3.2rem] font-bold text-center">
          회사 소개
        </h1>

        <div className="flex flex-col xs:flex-row w-full justify-start text-[1.4rem] xs:text-[1.7rem]"></div>
      </div>

      <Image
        src={background}
        alt="작가 chandlervid85"
        className="absolute w-screen h-full top-0 left-0 z-[-1] object-cover pointer-events-none"
        style={{ filter: "brightness(40%)" }}
        quality={100}
      />
    </section>
  );
};

export default AboutBg;
