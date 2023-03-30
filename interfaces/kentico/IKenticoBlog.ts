import { IKenticoAuthor } from "./IKenticoAuthor";
import { IKenticoDate } from "./IKenticoDate";

export interface IKenticoBlog {
  author: IKenticoAuthor;
  date: IKenticoDate;
}