import { IFilterState } from "@/components/Filter/IFIlterState";
import { ILineFilterState } from "@/components/LineFilter/ILineFilterState";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export const useLineFilters = () => {
 const router = useRouter();

 const [filterState, setFilterState] = useState<ILineFilterState>({
  date: {
   value: (router?.query?.date as string) ?? "All",
   isOpen: false
  }
 });

 useEffect(() => {
  let query: string = "";

  Object.keys(filterState).map((state) => {
   query += `${state}=${filterState[state].value}&`;
  });

  router.push(`${router.query.slug}?${query}`);
 }, [filterState]);

 const onFilterChange = (name: string, value: string) => {

  setFilterState({
   ...filterState,
   [name]: {
    isOpen: false,
    value
   },
  });
 };

 const onDisplayChange = (name: string) => {

  const selectedFilter = filterState[name];

  const cleanedUpState = {} as IFilterState;

  Object.keys(filterState).map((state) => {
   cleanedUpState[state] = {
    ...filterState[state],
    isOpen: false
   }
  })

  setFilterState({
   ...cleanedUpState,
   [name]: {
    ...selectedFilter,
    isOpen: !selectedFilter.isOpen
   }
  })

 }

 return {
  onFilterChange,
  filterState,
  onDisplayChange
 }

};