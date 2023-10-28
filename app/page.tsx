import Main from "@/components/Main/Main";
import Business from "@/components/Business/Business";
import Map from "@/components/Map/Map";
import Inquiry from "@/components/Inquiry/Inquiry";
import TopButton from "@/components/TopButton/TopButton";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Main />
      <Business />
      <Map />
      <Inquiry />
      <TopButton />
      <Loader body={"default"} />
    </div>
  );
}
