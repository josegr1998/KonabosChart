import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { BarsChart } from "../BarsChart/BarsChart";
import { SectionTitle } from "../SectionTitle/SectionTitle";

export const Homepage = ({ data }: { data: IAuthorData[] }) => (
  <div className="mt-8">
    <SectionTitle title="WHO HAS THE MOST BLOGS"/>
    <BarsChart data={data}/>
  </div>
);
