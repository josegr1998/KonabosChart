import { IFilterState } from "@/components/Filter/IFIlterState";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

export const useFilters = (data: IAuthorData[]) => {
  const router = useRouter();

  const [filterState, setFilterState] = useState<IFilterState>({
    type: {
      value: null,
      isOpen: false,
    },
    date: {
      value: null,
      isOpen: false,
    },
  });

  useEffect(() => {
    let query: string = "";

    Object.keys(filterState).map((state) => {
      if (filterState[state].value)
        query += `${state}=${filterState[state].value}&`;
    });

    if (filterState.date.value || filterState.type.value) {
      router.push(`?${query}`);
    }
  }, [filterState]);

  useEffect(() => {
    if (router.query?.type)
      setFilterState({
        ...filterState,
        type: {
          ...filterState.type,
          value: (router?.query?.type as string) ?? null,
        },
      });
    if (router.query?.date)
      setFilterState({
        ...filterState,
        date: {
          ...filterState.date,
          value: (router?.query?.date as string) ?? null,
        },
      });
  }, []);

  const onFilterChange = (name: string, value: string) => {
    setFilterState({
      ...filterState,
      [name]: {
        isOpen: false,
        value,
      },
    });
  };

  const onDisplayChange = (name: string) => {
    const selectedFilter = filterState[name];

    const cleanedUpState = {} as IFilterState;

    Object.keys(filterState).map((state) => {
      cleanedUpState[state] = {
        ...filterState[state],
        isOpen: false,
      };
    });

    setFilterState({
      ...cleanedUpState,
      [name]: {
        ...selectedFilter,
        isOpen: !selectedFilter.isOpen,
      },
    });
  };

  return {
    onFilterChange,
    filterState,
    onDisplayChange,
  };
};
