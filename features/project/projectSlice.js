import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUser } from '../user/userSlice';
import { setDashActive } from '../dashboard/dashboardSlice';

const initialState = {
  projects: [],
  projectLoading: false,
  projectErrors: [],
  projectSuccess: [],
};

// Create project
export const createProject = createAsyncThunk('project/createProject', async (formData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.post(url + 'project', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getUser());
    thunkAPI.dispatch(setDashActive('Projects'));
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || 'Create project error.');
  }
});

// Update project
export const updateProject = createAsyncThunk('project/updateProject', async ({ projectId, formData }, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(url + 'project/' + projectId, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data?.msg || 'Update project error.');
  }
});

// Get all projects
export const getAllProjects = createAsyncThunk('project/getAllProjects', async (data, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.get(url + 'project', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data?.msg || 'Get all projects error.');
  }
});

// Delete project
export const deleteProject = createAsyncThunk('project/deleteProject', async (data, thunkAPI) => {
  try {
    const { projectId } = data;
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    await axios.delete(url + 'project/' + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(projectId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data?.msg || 'Delete project error.');
  }
});

// LIKE PROJECT
export const likeProject = createAsyncThunk('project/likeProject', async (projectId, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(
      url + `project/like/${projectId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('Like project error.');
  }
});

// UN-LIKE PROJECT
export const unlikeProject = createAsyncThunk('project/unlikeProject', async (projectId, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().User;
    const { url } = thunkAPI.getState().Global;
    const response = await axios.patch(
      url + `project/unlike/${projectId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getUser());
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue('Unlike project error.');
  }
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetProjects: (state) => {
      return { ...initialState };
    },
    shiftProjectError: (state) => {
      state.projectErrors = [state.projectErrors].slice(1);
    },
    shiftProjectSuccess: (state) => {
      state.projectSuccess = [state.projectSuccess].slice(1);
    },
  },
  extraReducers: (builder) => {
    // Create Project
    builder.addCase(createProject.pending, (state, actions) => {
      state.projectLoading = true;
      state.projectErrors = [];
    });
    builder.addCase(createProject.fulfilled, (state, actions) => {
      const { project } = actions.payload;
      state.projects = [...state.projects, project];
      state.projectSuccess = [...state.projectSuccess, 'Project created successfully.'];
      state.projectLoading = false;
    });
    builder.addCase(createProject.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });

    // Update Project
    builder.addCase(updateProject.pending, (state, actions) => {
      state.projectLoading = true;
      state.projectErrors = [];
    });
    builder.addCase(updateProject.fulfilled, (state, actions) => {
      const { project } = actions.payload;
      state.projects = state.projects.map((item) => {
        return item._id === project._id ? project : item;
      });
      state.projectSuccess = [...state.projectSuccess, 'Project updated successfully.'];
      state.projectLoading = false;
    });
    builder.addCase(updateProject.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });

    // Get all projects
    builder.addCase(getAllProjects.pending, (state, actions) => {
      state.projectLoading = true;
      state.projectErrors = [];
    });
    builder.addCase(getAllProjects.fulfilled, (state, actions) => {
      const { projects } = actions.payload;
      state.projects = projects;
      state.projectLoading = false;
    });
    builder.addCase(getAllProjects.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });

    // Delete project
    builder.addCase(deleteProject.pending, (state, actions) => {
      state.projectLoading = true;
      state.projectErrors = [];
    });
    builder.addCase(deleteProject.fulfilled, (state, actions) => {
      const projectId = actions.payload;
      state.projects = state.projects.filter((item) => item._id !== projectId);
      state.projectSuccess = [...state.projectSuccess, 'Project deleted successfully.'];
      state.projectLoading = false;
    });
    builder.addCase(deleteProject.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });

    // Like project
    builder.addCase(likeProject.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });

    // Unlike project
    builder.addCase(unlikeProject.rejected, (state, actions) => {
      state.projectErrors = [...state.projectErrors, actions.payload];
      state.projectLoading = false;
    });
  },
});

export const { resetProjects, shiftProjectError, shiftProjectSuccess } = projectSlice.actions;

export default projectSlice.reducer;
