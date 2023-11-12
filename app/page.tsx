import Main from "@/components/Main/Main";
import Business from "@/components/ Business/Business";
import Map from "@/components/Map/Map";
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Main />
      <Map />
      <Business />
      <Footer />
      <Loader />
    </div>
  );
}
