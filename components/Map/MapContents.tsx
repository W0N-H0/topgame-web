"use client";
import { IoCopyOutline } from "react-icons/io5";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const hoverMotion = {
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  },
  whileHover: { scale: 1.05 },
};

const MapContents: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const address1 = "경기도 고양시 일산서구 가좌동 605번지";
  const address2 = "경기도 고양시 일산서구 송파로 174-1";

  const handleCopyClick = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      toast.success(`주소가 클립보드에 복사되었습니다.`);
    });
  };
  return (
    <motion.section
      ref={ref}
      initial={{ x: "-30vw" }}
      animate={{ x: isInView ? 0 : "-30vw" }}
      transition={{ duration: 0.75 }}
      className="w-full md:w-[34vw] flex flex-col justify-between items-start xl:items-center my-10 mx-2"
    >
      <div className="flex flex-col w-full">
        <span className="text-[1.5em] md:text-[3em] leading-[1.2] font-medium mb-3">
          · 위치 ·
        </span>
        <span className="text-[1.1em] lg:text-[1.35em] mb-3">
          상호명 : 탑개미자원
        </span>
        <motion.div
          {...hoverMotion}
          className="flex text-[1em] lg:text-[1.2em] cursor-pointer"
          onClick={() => handleCopyClick(address1)}
        >
          <span>{address1}</span>
          <button className="ml-3">
            <IoCopyOutline />
          </button>
        </motion.div>
        <motion.div
          {...hoverMotion}
          className="flex text-[1em] lg:text-[1.2em] cursor-pointer"
          onClick={() => handleCopyClick(address2)}
        >
          <span className="">{address2}</span>
          <button className="ml-3">
            <IoCopyOutline />
          </button>
        </motion.div>
      </div>

      <div className="w-full md:w-[30vw] flex flex-col justify-end items-end">
        <span className="flex text-[1.5em] md:text-[3em] leading-[1.2] font-medium mb-3 mt-10">
          · 네비게이션 ·
        </span>
        <span className="mb-3 text-[0.97em] lg:text-[1.25em]">
          길찾기 버튼을 클릭하여 네이게이션을 이용해보세요.
        </span>

        <button className="buttonEffect flex justify-center relative w-full xs:w-[30%] rounded-md border-[1px] p-2 border-black text-center text-[0.75em] md:text-[1em] font-bold overflow-hidden z-2 hover:delay-[175ms] duration-200 hover:text-white">
          <Link
            href="https://map.naver.com/p/directions/-/14105866.3745434,4536813.1560997,%EA%B2%BD%EA%B8%B0%20%EA%B3%A0%EC%96%91%EC%8B%9C%20%EC%9D%BC%EC%82%B0%EC%84%9C%EA%B5%AC%20%EC%86%A1%ED%8C%8C%EB%A1%9C%20174-1,,ADDRESS_POI/-/transit?c=19.00,0,0,0,dh"
            target="_blank"
          >
            길찾기 <span className="text-[1.2rem]">⇀</span>
          </Link>
        </button>
      </div>
    </motion.section>
  );
};

export default MapContents;
