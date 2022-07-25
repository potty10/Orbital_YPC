import { createSlice } from '@reduxjs/toolkit';

const currentWorkoutSlice = createSlice({
  name: 'currentWorkout',
  initialState: {
    workoutTitle: '',
    workoutContent: [],
    workoutDuration: 0, // in milliseconds
  },
  reducers: {
    setCurrentWorkout(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
  },
});

export const { setCurrentWorkout } = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
