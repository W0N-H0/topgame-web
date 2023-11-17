import { useRef, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import useInput from "@/hooks/useInput";

const InquiryForm: React.FC<{
  handle: any;
  checkboxChecked: boolean;
  selectedAddress: string;
  openPostcode: boolean;
  setOpenPostcode: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  handle,
  checkboxChecked,
  selectedAddress,
  openPostcode,
  setOpenPostcode,
}) => {
  const postcodeRef = useRef<HTMLDivElement | null>(null);
  const [name, handleNameChange, clearName] = useInput("");
  const [contact, handleContactChange, clearContact] = useInput("");
  const [company, handleCompanyChange, clearCompany] = useInput("");
  const [item, handleItemChange, clearItem] = useInput("");
  const [detailAddress, handleDetailAddressChange, clearDetailAddress] =
    useInput("");

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
    if (typeof window === "object") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트가 언마운트될 때 이벤트 제거
    return () => {
      if (typeof window === "object") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [openPostcode]);

  return (
    <form className="grid grid-cols-2 grid-rows-5 p-[1.5em] gap-3 text-[0.9em]">
      <div className="col-span-2 flex items-center">
        <span className="text-[1.5em] xs:text-[1.7em] ">
          온라인 상담 신청하기
        </span>
      </div>
      <input
        type="text"
        placeholder="이름"
        defaultValue={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="연락처"
        defaultValue={contact}
        onChange={handleContactChange}
      />
      <input
        type="text"
        placeholder="상호명"
        defaultValue={company}
        onChange={handleCompanyChange}
      />
      <input
        type="text"
        placeholder="품목"
        defaultValue={item}
        onChange={handleItemChange}
      />

      <input
        onClick={handle.clickButton}
        placeholder="주소 입력"
        defaultValue={selectedAddress}
        className="rounded-md col-span-2"
      />
      <input
        placeholder="상세주소 입력"
        defaultValue={detailAddress}
        onChange={handleDetailAddressChange}
        className="rounded-md col-span-2"
      />
      <div className="col-span-2 flex justify-center">
        <input
          type="checkbox"
          checked={checkboxChecked}
          onChange={handle.checkboxChange}
        />
        <a
          onClick={handle.openPopup}
          rel="noopener noreferrer"
          className="cursor-pointer ml-2"
        >
          개인정보 수집 및 이용에 동의합니다.
        </a>
      </div>
      <button
        type="submit"
        className="col-span-2 p-2 bg-gray-500 text-white rounded-md text-[1.1em]"
      >
        상담 신청하기
      </button>
      {openPostcode && (
        <div
          ref={postcodeRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md"
        >
          <DaumPostcode
            onComplete={handle.selectAddress}
            autoClose={false}
            defaultQuery=""
            style={{ width: "42vh" }}
          />
        </div>
      )}
    </form>
  );
};

export default InquiryForm;
