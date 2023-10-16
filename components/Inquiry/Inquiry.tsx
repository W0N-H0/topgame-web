"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import InquiryForm from "./InquiryForm";

const Inquiry: React.FC = () => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);

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
      setCheckboxChecked(!checkboxChecked);
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
      className="relative w-screen pb-[4vw] px-[5.4vw] xl:px-[8em]"
    >
      <div className="mb-[6em] h-[0.05em] w-full bg-black"></div>
      <div className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold">
        <h1>온라인 상담</h1>
        <h2 className="text-[0.4em] font-normal px-2 py-4 ">
          - 상담신청 하시면 365일 24시간 친절하게 상담해드립니다.
        </h2>
      </div>

      <div className="flex flex-col xs:flex-row justify-between m-4 xs:mx-10 xs:my-14">
        <div className=" w-[45%] shadow-[6px_0px_45px_10px_#192832D8] rounded-md">
          <div className="flex bg-gray-500 text-white font-bold text-[1.7em] p-6 justify-between items-center rounded-t-md">
            <p>
              고철, 비철, 철거 등 <br />
              얼마까지 받을 수 있을까?
            </p>
            <Image
              src={logo}
              width={120}
              height={100}
              alt="logo"
              className="rounded-md"
              style={{ opacity: 0.9 }}
            />
          </div>
          <InquiryForm
            handle={handle}
            checkboxChecked={checkboxChecked}
            selectedAddress={selectedAddress}
            openPostcode={openPostcode}
            setOpenPostcode={setOpenPostcode}
          />
        </div>
      </div>
    </section>
  );
};

export default Inquiry;
