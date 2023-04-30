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
import { useHomepageData } from "hooks/useHomepageData";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { KenticoParse } from "parsers/KenticoParse";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { getAuthorsCount } from "helpers/getAuthorsCount";

const getHomepageData = async (params:{type:string,date:string}) => {

  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();

  const contentType = params.type;

  let type = [];

  if (contentType && contentType !== "All") {
    type.push(contentType.toString());
  } else {
    type = ["blog", "news", "video", "podcast"];
  }

  const contentDate =
    params.date === "All"
      ? "2015"
      : params.date as string;
  const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(type);

  const filteredData = data.items.filter((item) => {
    const itemYear = item.date.rawData.value?.split("-")[0];

    if (itemYear >= contentDate) {
      return item;
    }
  });
  const authors = filteredData
    .map((item) => {
      if (item.author.value.length > 0) {
        return kenticoPrase.authorParse(item.author.value[0]);
      }
    })
    .filter((x) => x && x.name !== "Konabos Inc.");

  const authorsData = getAuthorsCount(authors);

  const sortedAuthorsData = authorsData.sort((a, b) => {
    return b.numberOfBlogPosts - a.numberOfBlogPosts;
  });

  const winner = sortedAuthorsData.reduce(
    (acc, author: IAuthorData, index: number) => {
      if (index > 0 && acc.numberOfBlogPosts < author.numberOfBlogPosts) {
        acc = author;
      } else if (index === 0) {
        acc = author;
      }

      return acc;
    },
    {
      numberOfBlogPosts: 0,
    }
  );

  return {winner,authorsData}

};

export const Homepage = async ({
  params,
}: {
  params: { type: string; date: string };
}) => {
  
  const { winner,authorsData } = await getHomepageData(params)

  return (
    <div className='mt-8 mb-8'>
      <SectionTitle
        title={`MOST ${getTitleLabel(params.type).toUpperCase()}`}
        className='underline underline-offset-4 decoration-brandsPrimary'
      />
      <Container>
        <div className='flex items-center justify-between'>
          <Filter/>
          <Tooltip
            text={`Clicking on a person's bar will take you to their profile`}
          />
        </div>
      </Container>
      {
      authorsData.length > 0 &&
      !authorsData.includes(undefined) ? (
        <>
              <BarsChart data={authorsData} type={params.type} />
          {winner?.numberOfBlogPosts > 0 && (
            <Winner
              winner={winner as IAuthor}
              className='mt-10'
              title={`MOST ${getTitleLabel(
                params.type
              ).toUpperCase()} AWARD`}
            />
          )}
        </>
      ) : (
        <Container>
          <NoResults />
        </Container>
      )}
    </div>
  );
};
