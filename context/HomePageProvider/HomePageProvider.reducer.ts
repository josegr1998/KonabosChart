import { useRouter } from "next/router";
import { Action } from "./HomePageProvider.actions";
import { HomePageState } from "./HomePageProvider.types";
import {
  getAuthorWithMostPosts,
  getBarsChartData,
  getUserTableRowsData,
  openSelectedFilterModal,
} from "./HomePageProvider.helpers";
import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";

export const initialState: HomePageState = {
  posts: [] as unknown as IITems<IKenticoBlog>,
  barsChartData: [],
  winner: null,
  tableData: {
    columns: [
      { field: "name", rowDrag: true, sortable: true },
      { field: "Total Posts", sortable: true },
      { field: "Number Of Blogs", sortable: true },
      { field: "Number Of Videos", sortable: true },
      { field: "Number Of Podcasts", sortable: true },
      { field: "Number Of News", sortable: true },
    ],
    rows: [],
  },
  isError: false,
  isLoading: true,
  types: ["blog", "news", "video", "podcast"],
  filters: {
    date: {
      isFilterModalOpen: false,
      value: "",
    },
    type: {
      isFilterModalOpen: false,
      value: "",
    },
  },
};

export const reducer = (
  state: HomePageState,
  action: Action
): HomePageState => {
  const router = useRouter();

  switch (action.type) {
    case "START_LOADING": {
      return { ...state, isLoading: true };
    }
    case "STOP_LOADING": {
      return { ...state, isLoading: false };
    }
    case "SET_HOMEPAGE_DATA": {
      const payload = action.payload as IITems<IKenticoBlog>;
      const filters = router.query as { type: string; date: string };
      const barsChartData = getBarsChartData(filters, payload.items);
      const winner = getAuthorWithMostPosts(barsChartData);
      const userTableRows = getUserTableRowsData(payload.items, state.types);

      return {
        ...state,
        isLoading: false,
        barsChartData,
        winner,
        tableData: {
          ...state.tableData,
          rows: userTableRows,
        },
        posts: payload,
        filters: {
          ...state.filters,
          date: {
            ...state.filters.date,
            value: router?.query?.date as string,
          },
          type: {
            ...state.filters.type,
            value: router?.query?.type as string,
          },
        },
      };
    }
    case "FILTER_HOMEPAGE_DATA": {
      const payload = action.payload as { date: string; type: string };
      const updatedFilterState = {} as { date: string; type: string };

      for (const key in state.filters) {
        if (payload[key]) {
          updatedFilterState[key] = payload[key];
        } else {
          updatedFilterState[key] = state.filters[key].value;
        }
      }

      const updatedBarsChartData = getBarsChartData(
        updatedFilterState,
        state.posts.items
      );
      const updatedWinner = getAuthorWithMostPosts(updatedBarsChartData);
      return {
        ...state,
        barsChartData: updatedBarsChartData,
        winner: updatedWinner,
        filters: {
          ...state.filters,
          date: {
            isFilterModalOpen: false,
            value: payload.date ?? state.filters.date.value,
          },
          type: {
            isFilterModalOpen: false,
            value: payload.type ?? state.filters.type.value,
          },
        },
      };
    }
    case "OPEN_FILTER_MODAL": {
      const payload = action.payload as { type: string };

      const filterStateWithOpenModal = openSelectedFilterModal({
        currentFilterState: state.filters,
        selectedFilterName: payload.type,
      });

      return {
        ...state,
        filters: filterStateWithOpenModal,
      };
    }
    default:
      break;
  }

  return state;
};
