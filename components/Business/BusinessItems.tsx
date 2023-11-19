"use client";
import { useRef } from "react";
import Image from "next/image";
import { useDraggable } from "react-use-draggable-scroll";

interface IEngagementProps {
  isHovered: boolean;
  onHoverChange: (isHovered: boolean) => boolean;
}

interface IBusinessItem {
  title: string;
  src: string;
  alt: string;
  body: string;
  body2?: string;
  body3?: string;
}

const businesstItems: IBusinessItem[] = [
  {
    title: "고철",
    src: "/assets/steel.png",
    alt: "고철 logo",
    body: `각종 고철류(생철, 중량고철, 경량고철, 가공고철 등)`,
  },
  {
    title: "비철",
    src: "/assets/비철2.jpg",
    alt: "비철 Logo",
    body: `각종 비철류(동, 구리, 알루미늄, 스테인리스 등)`,
  },
  {
    title: "컴퓨터/전자기기",
    src: "/assets/컴퓨터2.jpg",
    alt: "컴퓨터/전자기기Logo",
    body: `못쓰는 컴퓨터 본체, 모니터 및 각종 전자기기 등`,
  },
  {
    title: "철거",
    src: "/assets/철거.jpg",
    alt: "철거 logo",
    body: `- 상업공간 철거: 음식점, 주점, 의류매장, 체인점 등`,
    body2: "- 업무공간 철거: 사무실, 공장, 사무집기, 인테리어 등",
    body3: "- 기계 철거: 인쇄 기계, 실외기, 노후된 기계 및 불용설비 등",
  },
];

const BusinessItems = ({ onHoverChange }: IEngagementProps): JSX.Element => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const handleMouseEnter = () => {
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    onHoverChange(false);
  };

  return (
    <div
      className="h-[55vh] md:h-[60vh] w-full flex overflow-x-auto scrollbar-hide space-x-[2em] lg:space-x-[3em] list cursor-none"
      ref={ref}
      {...events}
    >
      {businesstItems.map((item) => (
        <li
          className="min-w-[80vw] md:min-w-[28vw] flex flex-col justify-start"
          key={item.title}
        >
          <section className="md:mb-[1.5em]">
            <div>
              <Image
                className={`mb-[1.5em] rounded-md w-full h-[35vh]`}
                src={item.src}
                width={450}
                height={450}
                alt={item.alt}
              />
            </div>
            <figure className={`bg-black h-[0.1em] w-full`} />
          </section>
          <h2 className="text-[1.5em] uppercase font-bold mb-[1em]">
            {item.title}
          </h2>
          <p className="text-[1em] lg:text-[1.25em] font-medium">
            {item.body}
            {/* <a
              href="/"
              className="underline"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              here
            </a> */}
          </p>
          {item.body2 ? (
            <p className="text-[1em] lg:text-[1.25em] font-medium">
              {item.body2}
            </p>
          ) : null}
          {item.body3 ? (
            <p className="text-[1em] lg:text-[1.25em] font-medium">
              {item.body3}
            </p>
          ) : null}
        </li>
      ))}
    </div>
  );
};

export default BusinessItems;
