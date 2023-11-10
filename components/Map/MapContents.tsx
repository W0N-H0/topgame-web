"use client";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

const hoverMotion = {
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  },
  whileHover: { scale: 1.2 },
};

// 버튼 애니메이션 효과
const buttonVariants = {
  rest: { height: 0, opacity: 1 },
  hover: { height: "auto", opacity: 0.8 },
};
const buttonVariants2 = {
  hover: { height: "auto", opacity: 0.8, color: "white" },
};

const MapContents: React.FC = () => {
  const address1 = "경기도 고양시 일산서구 가좌동 605번지";
  const address2 = "경기도 고양시 일산서구 송파로 174-1";

  const handleCopyClick = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      toast.success(`주소가 클립보드에 복사되었습니다.`);
    });
  };
  return (
    <section className="w-full md:w-[30vw] flex flex-col justify-between items-start xl:items-center my-10 mx-2">
      <div className="flex flex-col">
        <span className="text-[1.5em] md:text-[3em] leading-[1.2] font-medium mb-3">
          위치
        </span>
        <span className="text-[1.3rem] mb-3">상호명 : 탑개미자원</span>
        <div className="flex">
          <span>경기도 고양시 일산서구 가좌동 605번지</span>
          <motion.button
            {...hoverMotion}
            className="ml-3"
            onClick={() => handleCopyClick(address1)}
          >
            <IoCopyOutline />
          </motion.button>
        </div>
        <div className="flex">
          <span className="">경기도 고양시 일산서구 송파로 174-1</span>
          <motion.button
            {...hoverMotion}
            className="ml-3"
            onClick={() => handleCopyClick(address2)}
          >
            <IoCopyOutline />
          </motion.button>
        </div>
      </div>

      <div className="w-full md:w-[30vw] flex flex-col justify-end items-end">
        <span className="flex text-[1.5em] md:text-[3em] leading-[1.2] font-medium mb-3 mt-10">
          네비게이션
        </span>
        <span className="mb-3">
          하단 버튼을 클릭하여 네이게이션을 이용해보세요.
        </span>

        <button className="buttonEffect flex justify-center relative w-[30%] rounded-md border-[1px] p-2 border-black text-center text-[0.75em] md:text-[1em] font-bold overflow-y-hidden z-2 transition-colors delay-0 hover:delay-[175ms] duration-200 hover:text-white">
          <Link
            href="https://map.naver.com/p/directions/-/14105866.3745434,4536813.1560997,%EA%B2%BD%EA%B8%B0%20%EA%B3%A0%EC%96%91%EC%8B%9C%20%EC%9D%BC%EC%82%B0%EC%84%9C%EA%B5%AC%20%EC%86%A1%ED%8C%8C%EB%A1%9C%20174-1,,ADDRESS_POI/-/transit?c=19.00,0,0,0,dh"
            target="_blank"
          >
            길찾기 <span className="text-[1.2rem]">⇀</span>
          </Link>
        </button>
      </div>
    </section>
  );
};

export default MapContents;
