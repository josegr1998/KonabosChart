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
import { useRouter } from "next/router";
import { useEffect } from "react";

export const BarsChart = ({
  data,
  type,
}: {
  data: IAuthorData[];
  type: string;
}) => {
  const router = useRouter();

  const handler = (e) => {
    const slug = e.activePayload[0].payload.slug;

    router.push(`/latest/${slug}`);
  };

  useEffect(() => {
    const element = document.getElementsByClassName(
      "recharts-legend-item-text"
    );
    if (element) {
      element[0].innerHTML = `Number of ${type.endsWith('s') ? type : type + 's'}`;
    }
  }, [type]);

  const handlePopup = () => {
    const popupElement = document.getElementsByClassName(
      "recharts-tooltip-item-name"
    );
    if (popupElement?.length) {
      popupElement[0].innerHTML = `Number of ${type.endsWith('s') ? type : type + 's'}`;
    }
  };

  return (
    <Container>
      {data?.length ? (
        <div
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
