import AboutContents from "./_components/AboutContents";
import Loader from "@/components/Loader/Loader";

const About: React.FC = () => {
  return (
    <>
      <h2>about</h2>
      <AboutContents />
      <Loader isAboutPage={true} />
    </>
  );
};

export default About;
