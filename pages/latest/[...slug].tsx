import { GetServerSideProps } from "next";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { IAuthor } from "@/interfaces/app/IAuthor";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";

export default function Latest({
  data,
  winner,
}: {
  data: IAuthorData[];
  winner: IAuthor;
}) {
 

  return <div>Hi</div>;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
 
  let latestPosts = []

  const slug = context.params.slug[0];

  const kenticoHttpRequest = new KenticoHttpRequest();

  if(slug){

    const data = await kenticoHttpRequest.getLatestPosts();

  }

  return {
    props: {
      data: []
    },
  };
};
