import { Homepage } from "@/components/Homepage/Homepage";
import HomePageProvider from "context/HomePageProvider/HomePageProvider";

export default function Home() {

  return (
    <>
      {
       <HomePageProvider>
          <Homepage />
       </HomePageProvider> 
      }
    </>
  );
}
