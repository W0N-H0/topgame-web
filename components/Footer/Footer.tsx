import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen text-gray-600 font-semibold">
      <div className="flex justify-center mt-5 gap-4 pb-[1vw] px-[5.4vw] xl:px-[8rem]">
        <a>회사소개</a>
        <span className="border-l border-gray-600 rounded-md"></span>
        <a>서비스 이용약관</a>
      </div>
      <div className="border-b border-gray-600 w-screen"></div>
      <div className="items-center mt-4 pb-[1vw] px-[5.4vw] xl:px-[8rem] flex flex-col gap-1">
        <span>탑개미자원 | 대표: 고길현</span>
        <span>고양시 일산서구 가좌동 602</span>
        <div className="flex flex-col xs:flex-row gap-1">
          <span>사업자 등록번호: 111-1111-1111</span>
          <span className="hidden xs:block">|</span>
          <span>개인정보관리책임자: 고길현</span>
        </div>
        <span>대표번호: 031-000-0000 | 010-4007-8524 </span>
        Copyright © 탑개미자원 All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
