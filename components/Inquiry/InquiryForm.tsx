import { useRef, useEffect, MouseEvent } from "react";
import DaumPostcode from "react-daum-postcode";
import useInput from "@/hooks/useInput";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { EmailData } from "@/app/api/mail/route";

const hoverMotion = {
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  },
  whileHover: { scale: 1.03 },
};

interface InquiryFormProps {
  handle: any;
  agreedToTerms: boolean;
  selectedAddress: string;
  openPostcode: boolean;
  setOpenPostcode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => Promise<void>;
}

const InquiryForm: React.FC<InquiryFormProps> = ({
  handle,
  agreedToTerms,
  selectedAddress,
  openPostcode,
  setOpenPostcode,
  setSelectedAddress,
  fetchData,
}) => {
  const postcodeRef = useRef<HTMLDivElement | null>(null);
  const [name, handleNameChange, clearName] = useInput("");
  const [contact, handleContactChange, clearContact] = useInput("");
  const [company, handleCompanyChange, clearCompany] = useInput("");
  const [item, handleItemChange, clearItem] = useInput("");
  const [detailAddress, handleDetailAddressChange, clearDetailAddress] =
    useInput("");

  // 이메일 전송 함수
  const sendEmail = async (data: EmailData) => {
    const emailData = {
      name: data.name,
      contact: data.contact,
      company: data.company,
      item: data.item,
      address: data.address,
      addressDetail: data.addressDetail,
    };

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formData = {
      name,
      contact,
      company,
      item,
      address: selectedAddress,
      addressDetail: detailAddress,
      agreedToTerms,
    };

    interface FieldNames {
      [key: string]: string;
    }
    const fields: FieldNames = {
      name: "이름",
      contact: "연락처",
      company: "상호명",
      item: "품목",
      address: "주소",
      addressDetail: "상세주소",
    };

    for (let field in fields) {
      if (!(formData as any)[field]) {
        toast.error(`${fields[field]}을(를) 입력하세요.`);
        return;
      }
    }
    if (!agreedToTerms) {
      toast.error("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("상담신청이 완료되었습니다.");
        const responseData = await response.json();
        fetchData();
        clearName();
        clearContact();
        clearCompany();
        clearItem();
        clearDetailAddress();
        setSelectedAddress("");
        if (responseData) {
          sendEmail(formData);
        }
      } else {
        toast.error("상담신청 중 에러가 발생하였습니다.");
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      toast.error("상담신청 중 에러가 발생하였습니다...");
      console.error("Error submitting form:", error);
    }
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
    <form className="grid grid-cols-2 grid-rows-5 p-[1.5em] gap-3 text-[0.95em]">
      <div className="col-span-2 flex items-center">
        <span className="text-[1.6em] xs:text-[1.8em] ">
          온라인 상담 신청하기
        </span>
      </div>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="연락처"
        value={contact}
        onChange={handleContactChange}
      />
      <input
        type="text"
        placeholder="상호명"
        value={company}
        onChange={handleCompanyChange}
      />
      <input
        type="text"
        placeholder="품목"
        value={item}
        onChange={handleItemChange}
      />

      <input
        onClick={handle.clickButton}
        placeholder="클릭하여 주소를 검색하세요."
        value={selectedAddress}
        readOnly
        className="rounded-md col-span-2"
      />
      <input
        placeholder="상세주소 입력"
        value={detailAddress}
        onChange={handleDetailAddressChange}
        className="rounded-md col-span-2"
      />
      <div className="col-span-2 flex justify-center">
        <motion.input
          whileHover={{ scale: 1.3 }}
          type="checkbox"
          checked={agreedToTerms}
          onChange={handle.checkboxChange}
        />
        <motion.a
          whileHover={{ scale: 1.03 }}
          onClick={handle.openPopup}
          rel="noopener noreferrer"
          className="cursor-pointer ml-2"
        >
          개인정보 수집 및 이용에 동의합니다.
        </motion.a>
      </div>
      <motion.button
        {...hoverMotion}
        type="submit"
        className="col-span-2 p-2 bg-gray-500 text-white rounded-md text-[1.1em]"
        onClick={handleSubmit}
      >
        상담 신청하기
      </motion.button>

      {openPostcode && (
        <div
          ref={postcodeRef}
          className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md"
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
