import { IITems } from "@/interfaces/IItems";
import { IKenticoBlog } from "@/interfaces/kentico/IKenticoBlog";

export enum ActionTypes {
  START_LOADING = "START_LOADING",
  SET_HOMEPAGE_DATA = "SET_HOMEPAGE_DATA",
  FILTER_HOMEPAGE_DATA = "FILTER_HOMEPAGE_DATA",
  OPEN_FILTER_MODAL = "OPEN_FILTER_MODAL",
}

export const startLoadingAction = () => {
  return {
    type: ActionTypes.START_LOADING,
    payload: null,
  };
};

export const setHomePageDataAction = (payload: IITems<IKenticoBlog>) => {
  return {
    type: ActionTypes.SET_HOMEPAGE_DATA,
    payload,
  };
};

export const filterHomePageDataAction = (payload: {
  date?: string;
  type?: string;
}) => {
  return {
    type: ActionTypes.FILTER_HOMEPAGE_DATA,
    payload,
  };
};

export const openFilterModalAction = (payload: { type: string }) => {
  return {
    type: ActionTypes.OPEN_FILTER_MODAL,
    payload,
  };
};

export type Action =
  | ReturnType<typeof startLoadingAction>
  | ReturnType<typeof setHomePageDataAction>
  | ReturnType<typeof filterHomePageDataAction>
  | ReturnType<typeof openFilterModalAction>;
