import { Homepage } from "@/components/Homepage/Homepage";
import { useHomepageData } from "hooks/useHomepageData";


export default function Home() {

  const {authorsData,winner,isLoading} = useHomepageData()


  return <>
    {<Homepage data={authorsData} winner={winner} isLoading={isLoading}/>}
  </>;
}
