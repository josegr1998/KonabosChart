import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";

export type HomePageState = {
  posts: IITems<IKenticoBlog>;
  barsChartData: any[];
  winner: any;
  tableData: {
    columns: {
      field: string;
      rowDrag?: boolean;
      sortable?: boolean;
    }[];
    rows: any[];
  };
  isLoading: boolean;
  isError: boolean;
  types: string[];
  filters: Filters;
};

export type Filters = {
  date: {
    isFilterModalOpen: boolean;
    value: string;
  };
  type: {
    isFilterModalOpen: boolean;
    value: string;
  };
};
