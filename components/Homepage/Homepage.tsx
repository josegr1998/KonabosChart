import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { getTitleLabel } from "helpers/getTitleType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarsChart } from "../BarsChart/BarsChart";
import { Filter } from "../Filter/Filter";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const Homepage = ({ data }: { data: IAuthorData[] }) => {

  const router = useRouter();

  const [itemType,setItemType] = useState<string>('all');

  useEffect(()=>{
    
    if(router.query?.t)
    setItemType(router.query.t?.toString())

  },[router.asPath])

  const onFilterChange = (type:string)=>{
   if(type){
    router.push(`/?t=${type}`)
   }
  }

  return <div className="mt-8">
    <SectionTitle title={`MOST ${getTitleLabel(itemType).toUpperCase()}`}/>
    <Filter onChange={onFilterChange} value={itemType}/>
    <BarsChart data={data}/>
  </div>
};
