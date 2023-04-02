import { IAuthor } from "@/interfaces/app/IAuthor";
import { IKenticoAuthor } from "@/interfaces/kentico/IKenticoAuthor";
import { KenticoBaseParser } from "./KenticoBaseParser";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { IPostData } from "@/interfaces/app/IPostData";

export class KenticoParse extends KenticoBaseParser {
  authorParse(author: IKenticoAuthor["value"][0]): IAuthor {
    const authorPased = {
      name: `${this.valueParse(author?.first_name)} ${this.valueParse(
        author?.last_name
      )}`,
      caricature: {
        url: author.caricature.value[0].url,
      },
      experience: author.experience.rawData.value,
      jobTitle: author.job_title.value,
      slug:this.valueParse(author.slug) as string
    };

    return authorPased;
  }

  postParse(post: IKenticoBlog): IPostData {
    return {
      date: this.valueParse(post.date).toLocaleString(),
      title: this.valueParse(post.title) as string,
      hero: post.hero ? { url: post.hero.value[0].url, alt: null } : null,
      description: this.valueParse(post.metadata__meta_description) as string,
      type: post.system.type,
      slug: this.valueParse(post.slug) as string,
    };
  }
}