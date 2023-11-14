import Main from "@/components/Main/Main";
import Business from "@/components/ Business/Business";
import Map from "@/components/Map/Map";
import Loader from "@/components/Loader/Loader";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Main />
      <Business />
      <Map />
      <Loader body={"default"} />
    </div>
  );
}
