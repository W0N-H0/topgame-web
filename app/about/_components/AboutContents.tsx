import { NextPage } from "next";
import Image from "next/image";
import logo from "../../../public/logo_color.png";

const AboutContents: NextPage = () => {
  return (
    <section className="p-[8em] flex gap-5 justify-evenly ">
      <Image
        src={logo}
        alt="logo_color"
        width={450}
        height={380}
        quality={100}
        style={{ filter: "brightness(90%)" }}
        className="rounded-md shadow-[6px_0px_45px_10px_#192832D8]"
      />
      <div className="flex flex-col w-[40%] gap-5 text-[0.97em]">
        <p className="text-[1.5em] font-bold">
          정직과 신뢰를 바탕으로 고철매입, 철거 사업을 영위중인 <br />
          <span className="text-[1.4em] text-yellow-800">탑개미자원</span>
          입니다.
        </p>
        <p className="text-[1.2em] ">
          저희 탑개미자원은 각종 고철, 비철, 기계철, 폐전선을 매입하고, 상업공간
          및 기계 등을 철거하는 전문업체 입니다.
        </p>

        <p className="text-[1.2em] ">
          고양시, 파주시 등 경기북부 지역에서 오랜 경험과 노하우를 바탕으로
          다수의 거래처와 파트너쉽을 맺고 있으며, 모든 고객 분들께 최상의
          서비스를 제공 할 수 있도록 항상 최선을 다하고 있습니다.
        </p>
        <p className="text-[1.2em] ">
          불경기로 인한 상가철거가 많이 발생하는 요즘시기에, 고객분들의 부담을
          최소화 시켜드리고자 좋은 조건으로 철거를 진행하고 있으니 많은 관심
          부탁드립니다.
        </p>
        <p className="text-[1.2em] ">
          버려진 자원을 재활용하고, 환경을 보호한다는 자부심과 정직과 성실이라는
          이념을 바탕으로 고객님께 언제, 어디서든 다가 갈 수 있는 탑개미자원이
          되겠습니다.
        </p>
        <p className="text-[1.5em] font-bold"> 탑개미자원　 임직원 일동</p>
      </div>
    </section>
  );
};

export default AboutContents;
