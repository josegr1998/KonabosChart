import { IPostData } from "@/interfaces/app/IPostData";
import { deduplicateLastYear } from "./deduplicateLastYear";

export const getPostsByYearDefault = (posts: IPostData[]) => {
  let years = [];

  const parsedPosts = posts.reduce((acc, item, index) => {
    const year = item?.date?.split("/")[2].split(",")[0];

    if (!years.includes(year)) {
      const parsedItem = {
        date: item?.date?.split(",")[0],
        itemsCount: index + 1,
      };
      years.push(year);
      acc.push(parsedItem);
    }
    if (index === posts.length - 1) {
      const parsedItem = {
        date: item?.date?.split(",")[0],
        itemsCount: index + 1,
      };
      acc.push(parsedItem);
    }

    return acc;
  }, []);

  const deduplicatedPosts = deduplicateLastYear(parsedPosts);

  return deduplicatedPosts;
};
