import { IFilterState } from "@/components/Filter/IFIlterState";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export const useFilters = () => {
   const router = useRouter();
   const searchParams = useSearchParams();

  const [filterState, setFilterState] = useState<IFilterState>({
    type: {
      value:  searchParams.get('type') ?? "All",
      isOpen:false
    },
    date: {
      value: searchParams.get('date') ?? "All",
      isOpen:false
    }
  });

  useEffect(() => {
    let query: string = "";

    Object.keys(filterState).map((state) => {
      query += `${state}=${filterState[state].value}&`;
    });

    if (searchParams.get('type') !== filterState.type.value || searchParams.get('date') !== filterState.date.value){
      router.push(`?${query}`);
    }
  }, [filterState]);

  const onFilterChange = (name: string, value: string) => {
    
    setFilterState({
      ...filterState,
      [name]: {
        isOpen:false,
        value
      },
    });
  };

  const onDisplayChange = (name:string)=>{

    const selectedFilter = filterState[name];

    const cleanedUpState = {} as IFilterState;

    Object.keys(filterState).map((state)=>{
      cleanedUpState[state] = {
        ...filterState[state],
        isOpen:false
      }
    })

    setFilterState({
      ...cleanedUpState,
      [name]:{
        ...selectedFilter,
        isOpen:!selectedFilter.isOpen
      }
    })

  }

  return {
   onFilterChange,
   filterState,
   onDisplayChange
  }

};
