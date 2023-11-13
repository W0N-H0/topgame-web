"use client";
import MapContents from "./MapContents";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const hoverMotion = {
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  },
  whileHover: { scale: 1.02 },
};

const Map: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const motionRef = useRef(null);
  const isInView = useInView(motionRef);
  const motionRef2 = useRef(null);
  const isInView2 = useInView(motionRef2);

  const mapScript = document.createElement("script");
  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
  document.head.appendChild(mapScript);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 지도 생성
        const mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(37.697722, 126.7151823), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const markerPosition = new window.kakao.maps.LatLng(
          37.697722,
          126.7151823
        );

        // 결과값을 마커로 표시
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: markerPosition,
        });

        // 커스텀 오버레이 생성
        const content =
          '<div class="p-2 mt-8 text-[0.85rem] text-gray-600 font-bold"><a href="https://map.naver.com/p/entry/place/36760258?lng=126.7151554&lat=37.6977313&placePath=%2Fhome%3Fentry%3Dplt&c=15.00,0,0,0,dh" target="_blank">탑개미자원</a></div>';
        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  // 모바일 여부를 판단하는 useEffect
  // kakao map에서 tailwind CSS가 적용이 안되는 이슈로 width size를 통해 모바일여부 판별
  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 475) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    // 페이지가 처음 로드될 때 호출하여 초기 상태를 설정합니다.
    handleResize();

    // 윈도우의 리사이즈 이벤트를 감지하고 화면 크기 변화에 따라 isMobile 상태를 업데이트합니다.
    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트가 언마운트될 때, 리사이즈 이벤트 리스너를 제거합니다.
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="maps" className="w-screen py-[4em] px-[5.4vw] xl:px-[8em]">
      <motion.div
        ref={motionRef2}
        initial={{ x: "-30vw" }}
        animate={{ x: isInView2 ? 0 : "-30vw" }}
        transition={{ duration: 0.75 }}
        className="uppercase text-[2em] md:text-[3.5em] leading-[0.95] font-semibold"
      >
        <h1>WAY TO COME</h1>
      </motion.div>
      <motion.div className="flex flex-col xs:flex-row justify-between m-4 xs:m-10">
        <MapContents />
        <motion.div
          {...hoverMotion}
          ref={motionRef}
          initial={{ x: "30vw" }}
          animate={{ x: isInView ? 0 : "30vw" }}
          transition={{ duration: 0.75 }}
          id="map"
          style={{
            width: isMobile ? "100%" : "40vw",
            height: isMobile ? "40vh" : "60vh",
            borderRadius: "10px",
          }}
          className="shadow-[6px_0px_45px_20px_#192832D8]"
        />
      </motion.div>
    </section>
  );
};

export default Map;
