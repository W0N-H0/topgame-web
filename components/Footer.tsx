import React from "react";

const Footer = () => {
  return (
    <section className="w-screen pb-[10vw] px-[5.4vw] xl:px-[8rem]">
      <div className="w-full flex flex-col-reverse md:flex-row justify-start items-start">
        <main className="md:w-[50%] w-full">
          <h1 className="text-[2em] md:text-[5vw] leading-[1] font-bold">
            푸터
            <span className="text-[1.25em]">●</span> <br /> 푸터2
          </h1>

          <h3 className="mt-6 text-[1.25em] font-semibold">푸터3 <span className="font-extrabold">푸터4</span></h3>
        </main>
        <aside></aside>
      </div>
    </section>
  );
};

export default Footer;