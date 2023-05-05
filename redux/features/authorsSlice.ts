import { IAuthor } from "@/interfaces/app/IAuthor";
import { IAuthorData } from "@/interfaces/app/IAuthorData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthorSlice = {
 authors: IAuthorData[];
 winner:IAuthor
}

const initialState: AuthorSlice = {
  authors: [],
  winner: null
};

const authorsSlice = createSlice({
  name: "barChart",
  initialState,
  reducers: {
    setAuthorsData: (state, action: PayloadAction<IAuthorData[]>) => {
      state.authors = action.payload;
    },
    setWinner(state, action: PayloadAction<IAuthor>) {
      state.winner = action.payload;
    },
  },
});

export const { setAuthorsData, setWinner } = authorsSlice.actions;

export default authorsSlice.reducer;