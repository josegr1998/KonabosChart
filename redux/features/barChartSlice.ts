import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthorSlice = {
 authors: IAuthorData[];
}

const initialState: AuthorSlice = {
  authors: [],
};

const barChartSlice = createSlice({
 name: "barChart",
 initialState,
 reducers: {
  setAuthorsData: (state, action:PayloadAction<IAuthorData[]>) => {
   state.authors = action.payload;
  }
 }
});

export const {
 setAuthorsData
} = barChartSlice.actions;

export default barChartSlice.reducer;