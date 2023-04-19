export const deduplicateLastYear = (
  items: { date: string; itemsCount: number }[]
) => {
  const lastPost = items[items.length - 1];

  const firstPosts = items.filter((item, index) => index !== items.length - 1);

  firstPosts.pop();

  const deduplicatedPosts = [...firstPosts, lastPost];

  return deduplicatedPosts.filter((x)=>x);
};
