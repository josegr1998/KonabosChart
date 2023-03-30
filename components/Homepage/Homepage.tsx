import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { getTitleLabel } from "helpers/getTitleType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarsChart } from "../BarsChart/BarsChart";
import { Filter } from "../Filter/Filter";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { IFilterState } from "../Filter/IFIlterState";
import { useFilters } from "hooks/useFilters";

export const Homepage = ({ data }: { data: IAuthorData[] }) => {

  const router = useRouter();

  const {filterState,onFilterChange} = useFilters()
  
  useEffect(()=>{
    
    let query:string = '';

    Object.keys(filterState).map((state)=>{

      query+=`${state}=${filterState[state]}&`

    })

    router.push(`?${query}`)

  }, [filterState])


  return <div className="mt-8">
    <SectionTitle title={`MOST ${getTitleLabel(filterState.type).toUpperCase()}`}/>
    <Filter onChange={onFilterChange} states={filterState}/>
    <BarsChart data={data}/>
  </div>
};
