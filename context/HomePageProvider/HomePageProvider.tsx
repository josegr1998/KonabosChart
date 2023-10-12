import React, { Dispatch, createContext, useReducer } from "react";
import { initialState, reducer } from "./HomePageProvider.reducer";
import { HomePageState } from "./HomePageProvider.types";

type Props = {
  children: JSX.Element;
};

export const HomePageStateContext = createContext<HomePageState>(initialState);
export const HomePageDispatchContext = createContext<{
  dispatch: Dispatch<any>;
}>({
  dispatch: () => null,
});

const HomePageProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HomePageStateContext.Provider value={state}>
      <HomePageDispatchContext.Provider value={{ dispatch }}>
        {children}
      </HomePageDispatchContext.Provider>
    </HomePageStateContext.Provider>
  );
};

export default HomePageProvider;
