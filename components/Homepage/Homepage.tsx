import { getTitleLabel } from "helpers/getTitleType";
import { BarsChart } from "../BarsChart/BarsChart";
import { Filter } from "../Filter/Filter";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { Winner } from "../Winner/Winner";
import { Container } from "../Container/Container";
import { Tooltip } from "../Tooltip/Tooltip";
import { NoResults } from "../NoResults/NoResults";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UsersTable from "../UsersTable/UsersTable";
import {
  useHomePageActions,
  useHomePageState,
} from "context/HomePageProvider/HomePageProvider.hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";


export const Homepage = () => {
  const router = useRouter();

  const {
    barsChartData,
    isLoading,
    posts,
    tableData: { columns, rows },
    winner,
    filters,
  } = useHomePageState();

  const { generateHomePageData, filterHomePageData, openFilterModal } =
    useHomePageActions();


  useEffect(() => {
    generateHomePageData();
  }, []);

  const onFilterChange = (type: string, value: string) => {
    filterHomePageData({ [type]: value });
  };

  const onDisplayChange = (type: string) => openFilterModal(type);

  useEffect(() => {
    let query = "";
    for (const key in filters) {
      if (filters[key].value) {
        query = query += `${key}=${filters[key].value}&`;
      }
    }
    query && router.push(`?${query}`);
  }, [filters]);


  return (
    <div className='mt-8 mb-8'>
      {!isLoading && (
        <div>
          {" "}
          <SectionTitle
            title={`MOST ${getTitleLabel(filters.type.value).toUpperCase()}`}
            className='underline underline-offset-4 decoration-brandsPrimary'
          />
          <Container>
            <div className='flex items-center justify-between'>
              <Filter
                onChange={onFilterChange}
                states={filters}
                onDisplayChange={onDisplayChange}
              />
              <Tooltip
                text={`Clicking on a person's bar will take you to their profile`}
              />
            </div>
          </Container>
        </div>
      )}
      {isLoading ? (
        <div className="absolute top-1/2 right-1/2 transform -translate-y-1/2 translate-x-1/2">
          <span className='loader'></span>
        </div>
      ) : (
        <>
          {posts?.items?.length > 0 && barsChartData.length > 0 ? (
            <>
              <BarsChart
                barsChartData={barsChartData}
                type={filters.type.value}
              />
              {winner?.numberOfBlogPosts > 0 && (
                <Winner
                  winner={winner}
                  className='mt-10'
                  title={`MOST ${getTitleLabel(
                    filters.type.value
                  ).toUpperCase()} AWARD`}
                />
              )}
            </>
          ) : (
            <Container>
              <NoResults />
            </Container>
          )}
          <UsersTable columns={columns} rows={rows} />
        </>
      )}
    </div>
  );
};
