import { IAuthorData } from "@/interfaces/app/IAuthorData";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Container } from "../Container/Container";
import { getChartWitdth } from "helpers/getChartWidth";
import { useEffect } from "react";
import { getTitleLabel } from "helpers/getTitleType";
import { updateChartText } from "helpers/updateChartText";
import { useRouter } from "next/navigation";

export const BarsChart = ({
  data,
  type,
}: {
  data: IAuthorData[];
  type: string;
}) => {
  const router = useRouter();

  const handler = (e) => {
    const slug = e?.activePayload[0].payload.slug;

    router.push(`/latest/${slug}`);
  };

  useEffect(() => {
    updateChartText("recharts-legend-item-text", `Number of ${getTitleLabel(type)}`)
    updateChartText("recharts-tooltip-item-name", `Number of ${getTitleLabel(type)}`)
  }, [type]);

  const handlePopup = () => {
    updateChartText("recharts-tooltip-item-name", `Number of ${getTitleLabel(type)}`)
  };

  return (
    <Container>
      {data?.length ? (
        <div
          className="custom-scrollbar"
          style={{ marginTop: "20px", overflowX: "auto" }}
        >
          <BarChart
            width={getChartWitdth(data?.length)}
            height={250}
            data={data}
            barSize={250}
            style={{ margin: "0 auto",cursor:'pointer' }}
            onClick={(e) => handler(e)}
            barGap={15}
            barCategoryGap={15}
            defaultShowTooltip={false}
            onMouseMove={() => handlePopup()}

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
};
