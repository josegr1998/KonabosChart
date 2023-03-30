import { IFilterState } from "@/components/Filter/IFIlterState";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useFilters = () => {
  const router = useRouter();

  const [filterState, setFilterState] = useState<IFilterState>({
    type: (router?.query?.type as string) ?? "All",
    date: (router?.query?.date as string) ?? "All",
  });

  useEffect(() => {
    let query: string = "";

    Object.keys(filterState).map((state) => {
      query += `${state}=${filterState[state]}&`;
    });

    router.push(`?${query}`);
  }, [filterState]);

  const onFilterChange = (name: string, value: string) => {
    setFilterState({
      ...filterState,
      [name]: value,
    });
  };

  return {
   onFilterChange,
   filterState
  }

};
