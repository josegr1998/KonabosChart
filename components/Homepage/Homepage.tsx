import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { getTitleLabel } from "helpers/getTitleType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarsChart } from "../BarsChart/BarsChart";
import { Filter } from "../Filter/Filter";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { IFilterState } from "../Filter/IFIlterState";
import { useFilters } from "hooks/useFilters";
import { IAuthor } from "@/interfaces/app/IAuthor";
import { Winner } from "../Winner/Winner";

export const Homepage = ({ data,winner }: { data: IAuthorData[],winner:IAuthor }) => {

  const {filterState,onFilterChange,onDisplayChange} = useFilters()
  return <div className="mt-8 mb-8">
    <SectionTitle title={`MOST ${getTitleLabel(filterState.type.value).toUpperCase()}`} className="text-brandsDarkOrange"/>
    <Filter onChange={onFilterChange} states={filterState} onDisplayChange={onDisplayChange}/>
    <BarsChart data={data}/>
    <Winner winner={winner} className="mt-10"/>
  </div>
};
