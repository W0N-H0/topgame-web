import Typewriter from "typewriter-effect";

const CustomTypewriter = () => {
  return (
    <div className="text-[2.5rem] xs:text-[3.7rem]">
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 120,
        }}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(500)
            .typeString('<span class="font-bold">탑</span>')
            .typeString(
              '<span class="text-[1.35rem] xs:text-[3.2rem] font-bold">개미자원</span>'
            )
            .typeString(
              '<span class="text-[1.35rem] xs:text-[3.2rem]"> 입니다.</span>'
            )
            .pauseFor(900)
            .deleteAll(50)
            .start();
        }}
      />
    </div>
  );
};

export default CustomTypewriter;
