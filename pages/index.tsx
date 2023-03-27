import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import { KenticoHttpRequest } from "clients/KenticoHttpRequest";
import { KenticoParse } from "parsers/KenticoParse";
import { getAuthorsCount } from "helpers/getAuthorsCount";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";
import { IITems } from "@/interfaces/IItems";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { BarsChart } from "@/components/BarsChart";


export default function Home({data}:{data:IAuthorData[]}) {

  return <BarsChart data={data}/>
   
  
}


export const getServerSideProps: GetServerSideProps<{ data: any }> = async (context) => {

  const kenticoHttpRequest = new KenticoHttpRequest();

  const kenticoPrase = new KenticoParse();


  const data = await kenticoHttpRequest.getData<IITems<IKenticoBlog>>('blog');

  const authors = data.items.map((item)=>{
    return kenticoPrase.authorParse(item.author.value[0]);
  })

  const authorsData = getAuthorsCount(authors);

  return {
    props: {
      data: authorsData,
    },
  }
}