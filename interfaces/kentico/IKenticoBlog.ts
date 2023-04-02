import { IKenticoAsset } from "./IKenticoAsset";
import { IKenticoAuthor } from "./IKenticoAuthor";
import { IKenticoDate } from "./IKenticoDate";
import { IKenticoMetadataDescription } from "./IKenticoMetadataDescription";
import { IKenticoSlug } from "./IKenticoSlug";
import { IKenticoSystem } from "./IKenticoSystem";
import { IKenticoTitle } from "./IKenticoTitle";

export interface IKenticoBlog {
  author: IKenticoAuthor;
  date: IKenticoDate;
  title: IKenticoTitle;
  hero: IKenticoAsset;
  metadata__meta_description: IKenticoMetadataDescription;
  system: IKenticoSystem;
  slug: IKenticoSlug;
}