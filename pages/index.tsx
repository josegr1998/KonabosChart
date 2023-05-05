import { Homepage } from "@/components/Homepage/Homepage";
import { useHomepageData } from "hooks/useHomepageData";
import { useEffect } from "react";
import { setAuthorsData, setWinner } from "redux/features/authorsSlice";
import { useAppDispatch } from "redux/hooks";


export default function Home() {

  const {authorsData,winner,isLoading} = useHomepageData();

  const dispatch = useAppDispatch();
 
  useEffect(()=>{

    dispatch(setAuthorsData(authorsData));
    dispatch(setWinner(winner))

  },[authorsData])


  return <>
    {<Homepage isLoading={isLoading}/>}
  </>;
}
