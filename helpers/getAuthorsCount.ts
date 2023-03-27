import { IAuthor } from "@/interfaces/app/IAuthor";
import { IAuthorData } from "@/interfaces/app/IAuthorData";

export const getAuthorsCount = (authors: IAuthor[]): IAuthorData[] => {
  const authorNames: any = [];
  const authorCount: any = [];

  authors.forEach((author: any, index: number) => {
    if (authorNames.includes(author.name)) {
      const authorIndex = authorNames.indexOf(author.name);

      const authorObj = {
        name: author.name,
        numberOfBlogPosts: authorCount[authorIndex].numberOfBlogPosts + 1,
      };

      authorCount[authorIndex] = authorObj;
    } else {
      authorNames.push(author.name);
      authorCount.push({
        name: author.name,
        numberOfBlogPosts: 1,
      });
    }
  });

  return authorCount;
};