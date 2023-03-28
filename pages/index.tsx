import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { KenticoParse } from "parsers/KenticoParse";
import { getAuthorsCount } from "helpers/getAuthorsCount";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { IITems } from "@/interfaces/IItems";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { BarsChart } from "@/components/BarsChart/BarsChart";
import { Homepage } from "@/components/Homepage/Homepage";
import { useEffect } from "react";

export default function Home({ data }: { data: IAuthorData[] }) {
  const kenticoHttpRequest = new KenticoHttpRequest();

  // async function fetchData(){
  //   const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(['news']);

  //   console.log('data', data)

  // }

  // useEffect(()=>{
  //   fetchData();
  // })

  return <Homepage data={data} />;
}

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context,
) => {
  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();

  const contentType = context.query?.t;

  let type = [];

  if(contentType && contentType !== 'all') {
    type.push(contentType.toString());
  }
  else{
    type = ['blog', 'video', 'news', 'podcast']
  }

  const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(type);

  const authors = data.items.map((item) => {
    if(item.author.value.length > 0){
      return kenticoPrase.authorParse(item.author.value[0]);
    }
  }).filter((x)=>x && x.name !== 'Konabos Inc.');

  const authorsData = getAuthorsCount(authors);

  const sortedAuthorsData = authorsData.sort((a, b) => {
    return b.numberOfBlogPosts - a.numberOfBlogPosts;
  })

  return {
    props: {
      data: sortedAuthorsData,
    },
  };
};
