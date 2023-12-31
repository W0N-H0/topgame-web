"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import InquiryForm from "./InquiryForm";
import InquiryList from "./InquiryList";
import useIsMobile from "@/hooks/useIsMobile";
import { useInquiryStore } from "@/store/InquiryStore";
import { motion, useInView } from "framer-motion";

const Inquiry: React.FC = () => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const { data, loading, error, fetchData } = useInquiryStore();
  const motionRef = useRef(null);
  const isInView = useInView(motionRef);
  const motionRef2 = useRef(null);
  const isInView2 = useInView(motionRef2);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
      setSelectedAddress("");
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setSelectedAddress(data.address); // 주소 값을 상태에 업데이트
      setOpenPostcode(false);
    },

    // 체크박스 클릭 이벤트
    checkboxChange: () => {
      setAgreedToTerms(!agreedToTerms);
    },

    // 개인정보동의 클릭시 열리는 팝업창
    openPopup: () => {
      // 새 창 열기
      const popupWindow = window.open(
        "/privacy",
        "_blank",
        "width=500,height=500"
      );

      // 팝업이 차단되었을 경우 처리
      if (!popupWindow) {
        alert("팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도하세요.");
      }
    },
  };

  return (
    <section
      id="inquiry"
      className="relative w-screen  pb-[4vw] px-[5.4vw] xl:px-[8em]"
    >
      <div className="mb-[5em] h-[0.05em] w-full  bg-black"></div>
      <motion.div
        ref={motionRef}
        initial={{ x: "-30vw" }}
        animate={{ x: isInView ? 0 : "-30vw" }}
        transition={{ duration: 0.75 }}
        className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold"
      >
        <h1>온라인 상담</h1>
        <h2 className="text-[0.55em] xs:text-[0.4em] font-normal px-2 py-4 ">
          - 365일 24시간 친절하게 상담해드립니다.
        </h2>
      </motion.div>

      <motion.div
        ref={motionRef2}
        initial={{ x: "30vw" }}
        animate={{ x: isInView2 ? 0 : "30vw" }}
        transition={{ duration: 0.75 }}
        className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between m-4 xs:mx-10 xs:my-7"
      >
        <div className="w-full h-full lg:w-[48%] lg:h-[50%] shadow-[6px_0px_45px_10px_#192832D8] rounded-md">
          <div className="flex bg-gray-500 text-white font-bold text-[1.2em]  xs:text-[1.5em] xl:text=[1.7em] p-6 justify-between items-center rounded-t-md">
            <p>
              고철, 비철, 철거 등 <br />
              얼마까지 받을 수 있을까?
            </p>

            <Image
              src={logo}
              width={isMobile ? 70 : 120}
              height={100}
              alt="logo"
              className="rounded-md"
              style={{ opacity: 0.9 }}
            />
          </div>
          <InquiryForm
            handle={handle}
            agreedToTerms={agreedToTerms}
            selectedAddress={selectedAddress}
            openPostcode={openPostcode}
            setOpenPostcode={setOpenPostcode}
            setSelectedAddress={setSelectedAddress}
            fetchData={fetchData}
          />
        </div>
        <InquiryList data={data} loading={loading} />
      </motion.div>
    </section>
  );
};

export default Inquiry;
