import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Container } from "../Container/Container";
import { getChartWitdth } from "helpers/getChartWidth";

export const BarsChart = ({ data }: { data: IAuthorData[] }) => {

  const handler = (e) => {
    console.log(e)
  }

 return (
   <Container>
     {data?.length ? (
       <div style={{ marginTop: "20px", overflowX: "auto" }}>
         <BarChart
           width={getChartWitdth(data?.length)}
           height={250}
           data={data}
           barSize={250}
           style={{margin:'0 auto'}}
           onClick={(e) => handler(e)}
           barGap={15}
           barCategoryGap={15}
         >
           <CartesianGrid strokeDasharray='3 3' />
           <XAxis dataKey='name'></XAxis>
           <YAxis />
           <Tooltip />
           <Legend />
           <Bar dataKey='numberOfBlogPosts' fill='#54c4d5'></Bar>
         </BarChart>
       </div>
     ) : (
       <></>
     )}
   </Container>
 );

}