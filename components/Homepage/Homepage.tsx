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
import { Container } from "../Container/Container";
import { Tooltip } from "../Tooltip/Tooltip";
import { NoResults } from "../NoResults/NoResults";

export const Homepage = ({
  data,
  winner,
  isLoading,
}: {
  data: IAuthorData[];
  winner: IAuthor;
  isLoading: boolean;
}) => {
  const { filterState, onFilterChange, onDisplayChange } = useFilters();

  return (
    <div className='mt-8 mb-8'>
      <SectionTitle
        title={`MOST ${getTitleLabel(filterState.type.value).toUpperCase()}`}
        className='text-brandsDarkOrange'
      />
      <Container>
        <div className='flex items-center justify-between'>
          <Filter
            onChange={onFilterChange}
            states={filterState}
            onDisplayChange={onDisplayChange}
          />
          <Tooltip
            text={`Clicking on a person's bar will take you to their profile`}
          />
        </div>
      </Container>
      {!isLoading && data.length > 0 && !data.includes(undefined) ? (
        <>
          <BarsChart data={data} type={filterState.type.value} />
          {winner?.numberOfBlogPosts > 0 && (
            <Winner
              winner={winner}
              className='mt-10'
              title={`MOST ${getTitleLabel(
                filterState.type.value
              ).toUpperCase()} AWARD`}
            />
          )}
        </>
      ) : isLoading ? (
        <>
          <span className='loader'></span>
        </>
      ) : (
        <Container>
          <NoResults />
        </Container>
      )}
    </div>
  );
};
