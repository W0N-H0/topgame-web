"use client";
import MapContents from "./MapContents";
import { motion } from "framer-motion";
import { useEffect } from "react";

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
          '<div class="p-2 mt-7 text-[0.85rem] text-gray-600 font-bold">탑개미자원</div>';
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

  return (
    <motion.div className="flex justify-center mt-10">
      <MapContents />
      <motion.div
        {...hoverMotion}
        id="map"
        style={{ width: "40%", height: "60vh", borderRadius: "10px" }}
        className="shadow-2xl shadow-gray500/20 mx-4"
      />
    </motion.div>
  );
};

export default Map;
