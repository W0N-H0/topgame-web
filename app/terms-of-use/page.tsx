import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import background from "@/public/termsofuseBg.jpg";

const About: React.FC = () => {
  return (
    <section className="w-screen h-[55vh] relative flex justify-center items-center">
      <div className="flex flex-col absolute top-[40%] left-[15%] w-[70%] text-white">
        <h1 className="text-[1.6rem] xs:text-[3.2rem] font-bold text-center">
          서비스이용약관
        </h1>

        <div className="flex flex-col xs:flex-row w-full justify-start text-[1.4rem] xs:text-[1.7rem]"></div>
      </div>

      <Image
        src={background}
        alt="작가 pressfoto"
        className="absolute w-screen h-full top-0 left-0 z-[-1] pointer-events-none"
        style={{ filter: "brightness(50%)" }}
        quality={80}
      />
      <Loader body="서비스이용약관" />
    </section>
  );
};

export default About;
