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
}

const businesstItems: IBusinessItem[] = [
  {
    title: "고철",
    src: "/assets/steel.png",
    alt: "고철 logo",
    body: `각종 고철류 `,
  },
  {
    title: "비철",
    src: "/assets/비철2.jpg",
    alt: "비철 Logo",
    body: `각종 비철류, 동, 구리, 알루미늄, 스테인리스 등`,
  },
  {
    title: "컴퓨터/전자기기",
    src: "/assets/컴퓨터2.jpg",
    alt: "컴퓨터/전자기기Logo",
    body: `못쓰는 컴퓨터 본체, 모니터, 전자기기 등`,
  },
  {
    title: "의류/잡화",
    src: "/assets/steel.png",
    alt: "의류/잡화 Logo",
    body: `각종 옷, 헌가방, 신발(신발류는 짝이 맞고 재활용할 수 있는 것에 한함)`,
  },
  {
    title: `test`,
    src: "/assets/steel.png",
    alt: `test`,
    body: `test`,
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
            .
          </p>
        </li>
      ))}
    </div>
  );
};

export default BusinessItems;
