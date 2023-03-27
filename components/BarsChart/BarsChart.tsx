import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Container } from "../Container/Container";

export const BarsChart = ({ data }: { data: IAuthorData[] }) => {

  const handler = (e) => {
    console.log(e)
  }

 return (
   <Container>
     {data?.length ? (
       <div style={{ marginTop: "20px", overflowX: "scroll" }}>
         <BarChart
           width={3000}
           height={250}
           data={data}
           barSize={250}
           onClick={(e) => handler(e)}
         >
           <CartesianGrid strokeDasharray='3 3' />
           <XAxis dataKey='name'></XAxis>
           <YAxis />
           <Tooltip />
           <Legend />
           <Bar dataKey='numberOfBlogPosts' fill='#8884d8'></Bar>
         </BarChart>
       </div>
     ) : (
       <></>
     )}
   </Container>
 );

}