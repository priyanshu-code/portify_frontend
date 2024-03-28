import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: process.env.NEXT_PUBLIC_BACKEND_URL,
};
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

// export const { googleLoginTrue } = globalSlice.actions;

export default globalSlice.reducer;
