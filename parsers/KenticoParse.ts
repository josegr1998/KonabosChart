import { IAuthor } from "@/interfaces/app/IAuthor";
import { IKenticoAuthor } from "@/interfaces/kentico/IKenticoAuthor";
import { KenticoBaseParser } from "./KenticoBaseParser";

export class KenticoParse extends KenticoBaseParser {
  authorParse(author: IKenticoAuthor["value"][0]): IAuthor {
    const authorPased = {
      name: `${this.valueParse(author?.first_name)} ${this.valueParse(
        author?.last_name
      )}`,
    };

    return authorPased;
  }
}