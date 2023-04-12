import { IPostData } from "@/interfaces/app/IPostData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Container } from "../Container/Container";
import { useEffect } from "react";
import { updateChartText } from "helpers/updateChartText";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const LineChartComponent = ({
  data,
  className,
  authorName,
}: {
  data: IPostData[];
  className?: string;
  authorName: string;
}) => {

  const years = [];

  const parsedPosts = data.reverse().reduce((acc, item, index) => {

   const year = item.date.split("/")[2].split(',')[0];

   if(!years.includes(year)){
    const parsedItem = {
     date: item.date.split(",")[0],
     itemsCount: index + 1,
    };
    years.push(year)
    acc.push(parsedItem);

   }

    return acc;
  }, []);


  useEffect(() => {
    updateChartText("recharts-legend-item-text", `Number of posts`);
    updateChartText("recharts-tooltip-item-name", `Number of posts`);
  }, []);

  const handlePopup = () => {
    updateChartText("recharts-tooltip-item-name", `Number of posts`);
  };

  return (
   <Container>
    <div className={className}>
     <SectionTitle title={`${authorName.toUpperCase()} THROUGH THE YEARS`} className="text-brandsDarkOrange my-8" />
      <LineChart
       width={930}
       height={450}
       data={parsedPosts}
       style={{ margin: "auto" }}
       onMouseMove={() => handlePopup()}
      >
       <CartesianGrid strokeDasharray='3 3' />
       <XAxis dataKey='date' />
       <YAxis />
       <Tooltip />
       <Legend />
       <Line type='monotone' dataKey='itemsCount' stroke='#2facbf' />
      </LineChart>
     </div>
   </Container>
  );
};
