import { IITems } from "@/interfaces/IItems";
import { IAuthor } from "@/interfaces/app/IAuthor";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { getAuthorsCount } from "helpers/getAuthorsCount";
import { useRouter } from "next/router";
import { KenticoParse } from "parsers/KenticoParse";
import { useEffect, useState } from "react";

export const useHomepageData = (): {
  winner: IAuthor;
  authorsData: IAuthorData[];
  isLoading: boolean;
} => {
  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();

  const router = useRouter();

  const [authorsData, setAuthorsData] = useState<IAuthorData[]>([]);
  const [winner, setWinner] = useState<IAuthor>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const contentType = router.query?.type;

  let type = [];

  if (contentType && contentType !== "All") {
    type.push(contentType.toString());
  } else {
    type = ["blog", "news", "video", "podcast"];
  }

  const getData = async () => {
    const contentDate =
      router.query?.date === "All" ? "2015" : (router.query?.date as string);
    setIsLoading(true);
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
      .filter((x) => x);

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

    setAuthorsData(sortedAuthorsData);
    setWinner(winner as IAuthor);
    setIsLoading(false);

  };

  useEffect(() => {
   if(router.query.type && router.query.date){
    getData();
   }
  }, [router.query]);

  return { winner, authorsData, isLoading };
};
