import { IPostData } from "@/interfaces/app/IPostData";

export const getPostsByYear = (posts: IPostData[], year: string):{date:string,itemsCount:number}[] => {
  let index = 0;

  const parsedItems = posts.reduce((acc, item) => {
    index++;
    const postYear = item?.date?.split("/")[2].split(",")[0];
    if (postYear === year) {
      const parsedItem = {
        date: item.date.split(",")[0],
        itemsCount: index + 1,
      };
      acc.push(parsedItem);
    }

    return acc;
  }, []);

  return parsedItems;
};
