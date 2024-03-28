import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  token: '',
  user: {},
  userData: {},
  userErrors: [],
  userSuccess: [],
  userLoading: false,
};

// Fetch user
export const getUser = createAsyncThunk('user/getUser', async (data, thunkAPI) => {
  try {
    const token = data || thunkAPI.getState().User.token;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.get(url + 'user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Login with google id Token
export const loginWithGoogle = createAsyncThunk('user/loginWithGoogle', async (data, thunkAPI) => {
  try {
    const { url } = thunkAPI.getState().Global;
    const { id_token } = data;
    const response = await axios.post(url + 'auth/login', { ...data, googleIdToken: id_token });
    const { token, user, userData } = response.data;
    return thunkAPI.fulfillWithValue({ token, user, userData });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Update user
export const updateUser = createAsyncThunk('user/updateUser', async (user, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(url + 'user', user, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Reset user password
export const resetPassword = createAsyncThunk('user/resetPassword', async ({ values, message }, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    await axios.post(
      url + 'user/resetPassword',
      { ...values, provider: 'portify' },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(message);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
});

// Not implemented right now
export const deleteUser = createAsyncThunk('user/deleteUser', async (name, thunkAPI) => {});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      return { ...initialState };
    },
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    shiftUserError: (state) => {
      state.userErrors = [state.userErrors].slice(1);
    },
    shiftUserSuccess: (state) => {
      state.userSuccess = [state.userSuccess].slice(1);
    },
  },
  extraReducers: (builder) => {
    // Get user
    builder.addCase(getUser.pending, (state, actions) => {
      state.userLoading = true;
      state.userErrors = [];
    });
    builder.addCase(getUser.fulfilled, (state, actions) => {
      const { user, userData } = actions.payload;
      state.user = user;
      state.userData = userData;
      state.userLoading = false;
    });
    builder.addCase(getUser.rejected, (state, actions) => {
      state.userErrors = [...state.userErrors, actions.payload];
      state.userLoading = false;
    });

    // Login with google
    builder.addCase(loginWithGoogle.pending, (state, actions) => {
      state.userLoading = true;
      state.userErrors = [];
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, actions) => {
      const { token, user, userData } = actions.payload;
      state.token = token;
      state.user = user;
      state.userData = userData;
      state.userSuccess = [...state.userSuccess, `Welcome ${user.username}! `];
      state.userLoading = false;
    });
    builder.addCase(loginWithGoogle.rejected, (state, actions) => {
      state.userErrors = [...state.userErrors, actions.payload];
      state.userLoading = false;
    });

    // Update user
    builder.addCase(updateUser.pending, (state, actions) => {
      state.userErrors = [];
      // state.userLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, actions) => {
      const { user, userData } = actions.payload;
      state.user = user;
      state.userData = userData;
      state.userSuccess = [...state.userSuccess, `User updated successfully.`];
      state.userLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, actions) => {
      state.userErrors = [...state.userErrors, actions.payload];
      state.userLoading = false;
    });

    // Reset user password
    builder.addCase(resetPassword.pending, (state, actions) => {
      state.userErrors = [];
    });
    builder.addCase(resetPassword.fulfilled, (state, actions) => {
      state.userSuccess = [...state.userSuccess, actions.payload];
      state.userLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, actions) => {
      state.userErrors = [...state.userErrors, actions.payload];
      state.userLoading = false;
    });
  },
});

export const { logoutUser, setToken, shiftUserError, shiftUserSuccess } = userSlice.actions;
export default userSlice.reducer;
