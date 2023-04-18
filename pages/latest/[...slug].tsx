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

export default function Latest({
  data,
  authorName,
}: {
  data: IPostData[];
  authorName: string;
}) {
  const {filterState,onDisplayChange,onFilterChange} = useLineFilters();

  let parsedPosts = []

  const years = [];
  const months = []
  const reversedData = data.concat().reverse();
  let index = 0;


  const parsedItems = reversedData.reduce((acc, item) => {

    const year = item.date.split('/')[2].split(',')[0]
    if (year === filterState.date.value) {
      const parsedItem = {
        date: item.date.split(',')[0],
        itemsCount: index + 1,
      };
      index++;
      acc.push(parsedItem);
    }


    return acc
  }, []);

  if(filterState.date.value !== "All"){

    const parsedPostsByMonth = parsedItems.reduce((acc, item,index) => {

      const month = item.date.split('/')[0]

      if(!months.includes(month)){
        const parsedItem = {
          date: item.date.split(',')[0],
          itemsCount: index + 1,
        };
        months.push(month)
        acc.push(parsedItem);
      }

      return acc
        

    },[]);

    parsedPosts = parsedPostsByMonth;

  }
  else {

    const parsedPostsReversed = reversedData.reduce((acc, item, index) => {

      const year = item.date.split("/")[2].split(',')[0];

      if (!years.includes(year)) {
        const parsedItem = {
          date: item.date.split(",")[0],
          itemsCount: index + 1,
        };
        years.push(year)
        acc.push(parsedItem);

      }

      return acc;
    }, []);

    parsedPosts = parsedPostsReversed

  }



  return (
    <>
      <Container className="mt-8">
        <>
          <SectionTitle title={`${authorName.split(' ')[0].toUpperCase()} THROUGH THE YEARS`} className="text-brandsDarkOrange" />
          <LineFilter onChange={onFilterChange} onDisplayChange={onDisplayChange} states={filterState}/>
          <LineChartComponent
            data={parsedPosts}
            className=''
            authorName={authorName.split(" ")[0]}
          />
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
