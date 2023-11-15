"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DaumPostcode from "react-daum-postcode";

const Inquiry: React.FC = () => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const postcodeRef = useRef<HTMLDivElement | null>(null);
  const handle = {
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setSelectedAddress(data.address); // 주소 값을 상태에 업데이트
      setOpenPostcode(false);
    },

    // 체크박스 클릭 이벤트
    handleCheckboxChange: () => {
      setCheckboxChecked(!checkboxChecked);
    },
  };

  // 주소창 모달 외부 클릭시 모달 닫는 useEffect
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // 클릭된 엘리먼트가 DaumPostcode와 관련이 없으면서 openPostcode가 true인 경우 닫기
      if (
        postcodeRef.current &&
        !postcodeRef.current.contains(event.target) &&
        openPostcode
      ) {
        setOpenPostcode(false);
      }
    };

    // 외부 클릭 감지 이벤트 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPostcode]);

  return (
    <section className="relative w-screen pb-[4vw] px-[5.4vw] xl:px-[8em]">
      <div className="mb-[6em] h-[0.05em] w-full bg-black"></div>
      <div className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold">
        <h1>온라인 상담</h1>
      </div>

      <div className="flex flex-col xs:flex-row justify-between m-4 xs:m-10 border-2 border-red-500">
        <div className=" border-2">
          <p>고철, 비철, 철거 등</p>
          <p>견적 알아보기</p>
          <div className="grid grid-cols-2 grid-rows-5 ">
            <div className="col-span-2 flex">
              <span>온라인 상담 신청</span>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={handle.handleCheckboxChange}
                  />
                </label>
                개인정보수집동의
              </div>
            </div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div className="col-span-2">6</div>
            <div>
              7
              <input
                onClick={handle.clickButton}
                placeholder="주소 입력"
                className="rounded-md"
              ></input>
            </div>
          </div>
        </div>

        {openPostcode && (
          <div ref={postcodeRef} className="absolute top-0 left-0 rounded-md">
            <DaumPostcode
              onComplete={handle.selectAddress}
              autoClose={false}
              defaultQuery="판교역로 235"
              style={{ width: "50vh", borderRadius: "10px" }}
            />
          </div>
        )}
        {selectedAddress && <p>주소: {selectedAddress}</p>}
      </div>
    </section>
  );
};

export default Inquiry;
