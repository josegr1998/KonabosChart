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
  //   const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(['blog', 'news', 'video', 'podcast']);

  //   const selectedYear = '2022';

  //   const filteredData = data.items.filter((item) => {

  //     const itemYear = item.date.rawData.value?.split('-')[0];

  //     if(itemYear >= selectedYear){
  //       return item;
  //     }

  //   })

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

  let contentDate = 'All';

  const contentType = context.query?.type;

  contentDate = context.query?.date === 'All' ? '2015' : (context.query?.date as string)

  let type = [];

  if(contentType && contentType !== 'all') {
    type.push(contentType.toString());
  }
  else{
    type = ['blog', 'news', 'video', 'podcast']
  }

  const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>(type);

  const filteredData = data.items.filter((item) => {

    const itemYear = item.date.rawData.value?.split('-')[0];

    if (itemYear >= contentDate) {
      return item;
    }

  })

  const authors = filteredData.map((item) => {
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
