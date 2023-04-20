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
import { IAuthor } from "@/interfaces/app/IAuthor";
import { useHomepageData } from "hooks/useHomepageData";


export default function Home() {

  const {authorsData,winner,isLoading} = useHomepageData()


  return <>
    {<Homepage data={authorsData} winner={winner} isLoading={isLoading}/>}
  </>;
}
