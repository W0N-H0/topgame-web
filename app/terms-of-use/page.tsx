import Loader from "@/components/Loader/Loader";

const About: React.FC = () => {
  return (
    <main className="flex flex-col">
      서비스이용약관
      <Loader body={"서비스이용약관"} />
    </main>
  );
};

export default About;
