import { deduplicateLastYear } from "./deduplicateLastYear";

export const getPostsByMonth = (
  posts: { date: string; itemsCount: number }[]
) => {
  let months = [];

  const parsedPosts = posts.reduce((acc, item, index) => {
    const month = item.date.split("/")[0];

    if (!months.includes(month)) {
      const parsedItem = {
        date: item.date.split(",")[0],
        itemsCount: index + 1,
      };
      months.push(month);
      acc.push(parsedItem);
    }
    if (index === posts.length - 1) {
      const parsedItem = {
        date: item.date.split(",")[0],
        itemsCount: index + 1,
      };
      acc.push(parsedItem);
    }

    return acc;
  }, []);

  const deduplicatedPosts = deduplicateLastYear(parsedPosts);

  return deduplicatedPosts;
};
