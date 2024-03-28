import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUser } from '../user/userSlice';
import { setDashActive } from '../dashboard/dashboardSlice';
const initialState = {
  portfolio: {},
  portfolioLoading: false,
  portfolioErrors: [],
  portfolioSuccess: [],
};

// Create portfolio
export const createPortfolio = createAsyncThunk('portfolio/createPortfolio', async (data, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;

    // Make sure axios is imported
    const response = await axios.post(url + 'portfolio', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Get portfolio
export const getPortfolio = createAsyncThunk('portfolio/getPortfolio', async (data, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.get(url + 'portfolio', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Update portfolio
export const updatePortfolio = createAsyncThunk('portfolio/updatePortfolio', async (data, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(url + 'portfolio', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

const protfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetPortfolio: (state) => {
      return { ...initialState };
    },
    shiftPortfolioError: (state) => {
      state.portfolioErrors = [state.portfolioErrors].slice(1);
    },
    shiftPortfolioSuccess: (state) => {
      state.portfolioSuccess = [state.portfolioSuccess].slice(1);
    },
  },
  extraReducers: (builder) => {
    // Create Portfolio
    builder.addCase(createPortfolio.pending, (state, actions) => {
      state.portfolioLoading = true;
      state.portfolioErrors = [];
    });
    builder.addCase(createPortfolio.fulfilled, (state, actions) => {
      const { portfolio } = actions.payload;
      state.portfolio = portfolio;
      state.portfolioSuccess = [...state.portfolioSuccess, 'Portfolio created successfully.'];
      state.portfolioLoading = false;
    });
    builder.addCase(createPortfolio.rejected, (state, actions) => {
      state.portfolioErrors = [...state.portfolioErrors, actions.payload];
      state.portfolioLoading = false;
    });

    // Get portfolio
    builder.addCase(getPortfolio.pending, (state, actions) => {
      state.portfolioLoading = true;
      state.portfolioErrors = [];
    });
    builder.addCase(getPortfolio.fulfilled, (state, actions) => {
      const { portfolio } = actions.payload;
      state.portfolio = portfolio;
      state.portfolioLoading = false;
      // state.portfolioSuccess = [...state.portfolioSuccess, 'Portfolio fetched successfully.'];
    });
    builder.addCase(getPortfolio.rejected, (state, actions) => {
      state.portfolioErrors = [...state.portfolioErrors, actions.payload];
      state.portfolioLoading = false;
    });

    // Update portfolio
    builder.addCase(updatePortfolio.pending, (state, actions) => {
      state.portfolioLoading = true;
      state.portfolioErrors = [];
    });
    builder.addCase(updatePortfolio.fulfilled, (state, actions) => {
      const { portfolio } = actions.payload;
      state.portfolio = portfolio;
      state.portfolioLoading = false;
      state.portfolioSuccess = [...state.portfolioSuccess, 'Portfolio updated successfully.'];
    });
    builder.addCase(updatePortfolio.rejected, (state, actions) => {
      state.portfolioErrors = [...state.portfolioErrors, actions.payload];
      state.portfolioLoading = false;
    });
  },
});

export const { resetPortfolio, shiftPortfolioError, shiftPortfolioSuccess } = protfolioSlice.actions;

export default protfolioSlice.reducer;
