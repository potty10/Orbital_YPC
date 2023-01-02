import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteWorkoutByUserAndId, loadAllWorkoutsByUser } from '../db/database';

// https://hybridheroes.de/blog/2021-01-08-redux-toolkit-react-native/
// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
// https://redux.js.org/tutorials/essentials/part-5-async-logic
// https://redux.js.org/tutorials/essentials/part-6-performance-normalization
// https://dev.to/julfikarhaidar/redux-toolkit-crud-example-with-react-hooks-4d98

export const loadAllWorkouts = createAsyncThunk('workoutList/loadAllWorkouts', loadAllWorkoutsByUser);

export const deleteWorkoutById = createAsyncThunk('workoutList/deleteWorkoutById', deleteWorkoutByUserAndId);

const workoutListSlice = createSlice({
  name: 'workoutList',
  initialState: {
    workoutList: [],
    isLoading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllWorkouts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllWorkouts.fulfilled, (state, action) => {
      state.workoutList = action.payload;
      state.loading = false;
    });
    builder.addCase(loadAllWorkouts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteWorkoutById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteWorkoutById.fulfilled, (state, action) => {
      state.workoutList = state.workoutList.filter((item) => item.workoutId !== action.payload);
      // let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
      // state.workoutList = action.payload
      state.loading = false;
    });
    builder.addCase(deleteWorkoutById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default workoutListSlice.reducer;
