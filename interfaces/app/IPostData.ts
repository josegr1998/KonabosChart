import { IAuthor } from "./IAuthor";

export interface IPostData {
  date: string;
  title: string;
  hero: {
    url: string;
    alt: string;
  };
  description: string;
  type: string;
  slug: string;
  author: IAuthor;
}