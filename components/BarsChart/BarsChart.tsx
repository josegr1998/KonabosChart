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

export const BarsChart = ({ data }: { data: IAuthorData[] }) => {
  const router = useRouter();

  const handler = (e) => {
    const slug = e.activePayload[0].payload.slug;

    router.push(`/latest/${slug}`);
  };

  return (
    <Container>
      {data?.length ? (
        <div style={{ marginTop: "20px", overflowX: "auto" }}>
          <BarChart
            width={getChartWitdth(data?.length)}
            height={250}
            data={data}
            barSize={250}
            style={{ margin: "0 auto" }}
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
};
