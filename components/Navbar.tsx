"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    id: "item1",
    name: "홈",
  },
  {
    id: "item2",
    name: "업체소개",
  },
  {
    id: "item3",
    name: "test3",
  },
];
const navbarAnimation = {
  initial: {
    opacity: 1,
    translateY: 0,
  },
  animate: {
    opacity: 0,
    translateY: "-50vh",
  },
};

export default function Navbar() {
  const dynamicPadding = { padding: "calc(0.5rem + 2.5vh) 3vw" };
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [navbarStyle, setNavbarStyle] = useState<Object>({});

  useEffect(() => {
    let lastScrollY: number = window.scrollY;
    document.addEventListener("scroll", () => {
      const currentScrollY: number = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsAnimating(true);
      } else if (currentScrollY < lastScrollY) {
        setIsAnimating(false);
      }
      lastScrollY = currentScrollY;
    });
    const handleScroll = () => {
      const windowHeight: number = window.innerHeight;
      const scrollY: number = window.scrollY;
      const halfwayPoint: number = windowHeight / 2;

      if (scrollY > halfwayPoint) {
        const newNavbarStyle = {
          background: "#f4f4f4",
          color: "black",
        };

        setNavbarStyle(newNavbarStyle);
      } else {
        setNavbarStyle({});
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };
    handleScroll();
  }, []);

  return (
    <motion.nav
      className={`fixed flex justify-between items-center bg-transparent text-white w-screen z-[3] text-center transition-colors ease-in-out duration-500`}
      style={{ ...dynamicPadding, ...navbarStyle }}
      initial="initial"
      animate={isAnimating ? `animate` : `initial`}
      variants={navbarAnimation}
      transition={{ duration: 0.35, ease: `linear` }}
    >
      <Link
        href="#home"
        className="flex text-[2rem] font-bold tracking-tighter navItem"
      >
        <Image
          src={logo}
          width={50}
          height={30}
          alt="antlogo"
          className="w-14 h-full pt-1"
        />
        <span className="text-[2.4rem]">탑</span>
        <span className="pt-2">개미자원</span>
      </Link>

      <ul className="hidden lg:flex justify-center items-center gap-x-[2vw] mr-[3rem]">
        {navItems.map((item, index) => (
          <li
            className="flex justify-center items-center cursor-pointer h-[25px] px-[1rem]"
            key={index}
          >
            <p className="navItem relative text-center font-medium">
              {item.name}
            </p>
          </li>
        ))}
      </ul>

      <div>
        <div className="hidden lg:flex justify-center gap-x-[1px] hover:gap-x-[5px] duration-[25ms] ease-in-out cursor-pointer w-[2rem]">
          <p className="flex items-center font-bold text-[1.75rem] mb-3">.</p>
          <p className="flex items-center font-bold text-[1.75rem] mb-3">.</p>
          <p className="flex items-center font-bold text-[1.75rem] mb-3">.</p>
        </div>
        <button className="uppercase block lg:hidden font-semibold">
          Menu
        </button>
      </div>
    </motion.nav>
  );
}
