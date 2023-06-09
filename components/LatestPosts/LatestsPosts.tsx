import { IPostData } from "@/interfaces/app/IPostData";
import { Posts } from "../Posts/Posts";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const LatestPosts = ({
  data,
  authorName,
}: {
  data: IPostData[];
  authorName: string;
}) => (
  <div className="mb-24">
    <SectionTitle title={`LATEST FROM ${authorName.toUpperCase()}`} className="underline underline-offset-4 decoration-brandsPrimary my-16"/>
    <Posts data={data} />
  </div>
);
