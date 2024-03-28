import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allTemplates: [],
  templatesLoading: false,
};
export const getAllTemplates = createAsyncThunk('template/getAllTemplates', async (user, thunkAPI) => {
  try {
    const { url } = thunkAPI.getState().Global;
    const response = await axios.get(url + 'publicTemplates');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error.response);
    console.log('getAllTemplatesError');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// STAR TEMPLATE
export const starTemplate = createAsyncThunk('template/starTemplate', async (templateId, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(
      url + `template/star/${templateId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log('star Error');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// UN-STAR TEMPLATE
export const unStarTemplate = createAsyncThunk('template/unStarTemplate', async (templateId, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(
      url + `template/unstar/${templateId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log('unStar Error');
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTemplates.pending, (state, actions) => {
      state.templatesLoading = true;
    });
    builder.addCase(getAllTemplates.fulfilled, (state, actions) => {
      state.allTemplates = actions.payload;
      state.templatesLoading = false;
    });
    builder.addCase(getAllTemplates.rejected, (state, actions) => {
      state.templatesLoading = false;
    });
  },
});

// export const { logoutUser } = userSlice.actions;

export default templateSlice.reducer;
