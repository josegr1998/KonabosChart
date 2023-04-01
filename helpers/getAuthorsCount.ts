import { IAuthor } from "@/interfaces/app/IAuthor";
import { IAuthorData } from "@/interfaces/app/IAuthorData";

export const getAuthorsCount = (authors: IAuthor[]): IAuthorData[] => {
  const authorNames: any = [];
  const authorCount: any = [];

  authors.forEach(({name,experience,jobTitle,caricature}: IAuthor, index: number) => {

    const authorObj = {
      name,
      caricature,
      experience,
      jobTitle,
      numberOfBlogPosts:null,
    };

    if (authorNames.includes(name)) {
      const authorIndex = authorNames.indexOf(name);

      authorObj.numberOfBlogPosts = authorCount[authorIndex].numberOfBlogPosts + 1,
      
      authorCount[authorIndex] = authorObj;
    } else {
      authorNames.push(name);
      authorCount.push({
        ...authorObj,
        numberOfBlogPosts: 1,
      });
    }
  });

  return authorCount;
};