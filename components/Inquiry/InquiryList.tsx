"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import phoneCall from "@/public/phone_call.gif";

const InquiryList: React.FC = () => {
  return (
    <div className="flex flex-col justify-center w-full lg:w-[48%] h-full shadow-[6px_0px_45px_10px_#192832D8] rounded-md font-bold p-6">
      <div className="flex justify-between items-center text-[1.7em] pt-3 pb-7 px-4 border-b-2 border-gray-500 mb-2">
        <h1>
          상담신청
          <br /> 진행현황 리스트
        </h1>
        <div className="flex p-2">
          <Image
            src={phoneCall}
            width={60}
            alt="phone call image"
            style={{ opacity: 0.8 }}
          />
          <div className="ml-1 text-[0.6em] flex flex-col justify-center items-center">
            <h2> 탑개미자원 고객센터</h2>
            <a href="tel:+8201040078524">010-4007-8524</a>
          </div>
        </div>
      </div>
      <Swiper
        centeredSlides={true}
        style={{ height: "385px" }}
        spaceBetween={10}
        slidesPerView={7}
        direction="vertical"
        loop={true}
        autoplay={{
          delay: 2000,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="p-3"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 11</SwiperSlide>
        <SwiperSlide>Slide 22</SwiperSlide>
        <SwiperSlide>Slide 33</SwiperSlide>
        <SwiperSlide>Slide 44</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default InquiryList;
