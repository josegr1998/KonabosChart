import { GetServerSideProps } from "next";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { IKenticoAuthor } from "@/interfaces/kentico/IKenticoAuthor";
import { KenticoParse } from "parsers/KenticoParse";
import { IPostData } from "@/interfaces/app/IPostData";

export default function Latest({ data }: { data: IPostData[] }) {

  return <div>Hi</div>;
}

export const getServerSideProps: GetServerSideProps<{
  data: IPostData[];
}> = async (context) => {
  let latestPosts: IITems<IKenticoBlog> | [] = [];

  const slug = context.params.slug[0];

  //get author data profile
  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();

  if (slug) {
    const data = await kenticoHttpRequest.getAuthorProfile<
      IITems<IKenticoAuthor>
    >(slug);

    const authorCodename = data.items[0].system.codename;

    latestPosts = await kenticoHttpRequest.getLatestAuthorPosts<
      IITems<IKenticoBlog>
    >(authorCodename);

    const parsedPosts =
      latestPosts?.items?.length > 0
        ? latestPosts.items
            .reduce((acc, post) => {
              acc.push(kenticoPrase.postParse(post));

              return acc;
            }, [])
            .sort((a, b) => {
              return (new Date(b.date) as any) - (new Date(a.date) as any);
            })
        : [];

    return {
      props: {
        data: parsedPosts,
      },
    };
  }
  return {
    props: {
      data: [],
    },
  };
};
