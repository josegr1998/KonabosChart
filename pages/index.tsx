import { Homepage } from "@/components/Homepage/Homepage";
import { useHomepageData } from "hooks/useHomepageData";
import { useAppSelector } from "redux/hooks";


export default function Home() {

  const {authorsData,winner,isLoading} = useHomepageData();

  const authors = useAppSelector(state => state.barCharReducer.authors);

  console.log("authors",authors)


  return <>
    {<Homepage data={authorsData} winner={winner} isLoading={isLoading}/>}
  </>;
}
