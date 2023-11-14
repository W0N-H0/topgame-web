import AboutBg from "./_components/AboutBg";
import AboutContents from "./_components/AboutContents";
import Loader from "@/components/Loader/Loader";

const About: React.FC = () => {
  return (
    <main className="flex flex-col">
      <AboutBg />
      <AboutContents />
      <Loader body={"회사소개"} />
    </main>
  );
};

export default About;
