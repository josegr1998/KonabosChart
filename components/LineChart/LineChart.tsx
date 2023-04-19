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
  data: {itemsCount:number,date:string}[];
  className?: string;
  authorName: string;
}) => {

  useEffect(() => {
    updateChartText("recharts-legend-item-text", `Number of posts`);
    updateChartText("recharts-tooltip-item-name", `Number of posts`);
  }, []);

  const handlePopup = () => {
    updateChartText("recharts-tooltip-item-name", `Number of posts`);
  };

  return (
    <div className={className}>
      <LineChart
       width={930}
       height={450}
        data={data}
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
  );
};
