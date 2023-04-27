import { GetServerSideProps } from "next";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { IKenticoAuthor } from "@/interfaces/kentico/IKenticoAuthor";
import { KenticoParse } from "parsers/KenticoParse";
import { IPostData } from "@/interfaces/app/IPostData";
import { LatestPosts } from "@/components/LatestPosts/LatestsPosts";
import { LineChartComponent } from "@/components/LineChart/LineChart";
import { Filter } from "@/components/Filter/Filter";
import LineFilter from "@/components/LineFilter/LineFilter";
import { Container } from "@/components/Container/Container";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { useLineFilters } from "hooks/useLineFilters";
import { useState } from "react";
import { getPostsByYear } from "helpers/getPostsByYear";
import { getPostsByMonth } from "helpers/getPostsByMonth";
import { getPostsByYearDefault } from "helpers/getPostsByYearDefault";
import { NoResults } from "@/components/NoResults/NoResults";

export default function Latest({
  data,
  authorName,
}: {
  data: IPostData[];
  authorName: string;
}) {
  const { filterState, onDisplayChange, onFilterChange } = useLineFilters();

  let parsedPosts = [] as { date: string; itemsCount: number }[];

  const reversedData = data.concat().reverse();


  if (filterState.date.value !== "All") {
    const parsedItems = getPostsByYear(reversedData, filterState.date.value);

    const parsedPostsByMonth = getPostsByMonth(parsedItems);

    parsedPosts = parsedPostsByMonth;
  } else {
    const parsedPostsReversed = getPostsByYearDefault(reversedData);

    parsedPosts = parsedPostsReversed;
  }

  
  return (
    <>
      <Container className='mt-8'>
        <>
          <SectionTitle
            title={`${authorName
              .split(" ")[0]
              .toUpperCase()} THROUGH THE YEARS`}
            className='underline underline-offset-4 decoration-brandsPrimary'
          />
          <LineFilter
            onChange={onFilterChange}
            onDisplayChange={onDisplayChange}
            states={filterState}
          />
         {parsedPosts?.length > 0 ? <div className="overflow-x-auto">
            <LineChartComponent
              data={parsedPosts}
              className=''
              authorName={authorName.split(" ")[0]}
            />
          </div> : <div>
              <NoResults />
            </div>}
        </>
      </Container>
      <LatestPosts data={data.slice(0, 6)} authorName={authorName} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: IPostData[];
}> = async (context) => {
  let latestPosts: IITems<IKenticoBlog> | [] = [];

  const slug = context.params.slug[0];

  //get author data profile
  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();

  if (slug) {
    const data = await kenticoHttpRequest.getAuthorProfile<
      IITems<IKenticoAuthor>
    >(slug);

    const authorCodename = data.items[0].system.codename;

    latestPosts = await kenticoHttpRequest.getLatestAuthorPosts<
      IITems<IKenticoBlog>
    >(authorCodename);

    const parsedPosts =
      latestPosts?.items?.length > 0
        ? latestPosts.items
            .reduce((acc, post) => {
              acc.push(kenticoPrase.postParse(post));

              return acc;
            }, [])
            .sort((a, b) => {
              return (new Date(b.date) as any) - (new Date(a.date) as any);
            })
        : [];

    return {
      props: {
        data: parsedPosts,
        authorName: `${data.items[0]?.first_name.value} ${data.items[0].last_name.value}`,
      },
    };
  }
  return {
    props: {
      data: [],
    },
  };
};
