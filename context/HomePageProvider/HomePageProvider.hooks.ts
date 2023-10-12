import { useContext } from "react";
import {
  HomePageDispatchContext,
  HomePageStateContext,
} from "./HomePageProvider";
import {
  filterHomePageDataAction,
  openFilterModalAction,
  setHomePageDataAction,
  startLoadingAction,
} from "./HomePageProvider.actions";
import { getAllPostsByTypes } from "./HomePageProvider.helpers";

export const useHomePageState = () => useContext(HomePageStateContext);
export const useHomePageDispatch = () => useContext(HomePageDispatchContext);

export const useHomePageActions = () => {
  const { dispatch } = useHomePageDispatch();
  const { types } = useHomePageState();

  const generateHomePageData = async () => {
    try {
      dispatch(startLoadingAction());
      const posts = await getAllPostsByTypes(types);

      dispatch(setHomePageDataAction(posts));
    } catch (error) {}
  };

  const filterHomePageData = (filters: { date?: string; type?: string }) => {
    dispatch(filterHomePageDataAction(filters));
  };

  const openFilterModal = (type: string) => {
    dispatch(openFilterModalAction({ type }));
  };

  return { generateHomePageData, filterHomePageData, openFilterModal };
};
