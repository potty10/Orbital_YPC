import { createSlice } from '@reduxjs/toolkit';

const editedWorkoutSlice = createSlice({
  name: 'editedWorkout',
  initialState: {
    workoutTitle: '',
    workoutContent: [],
    editingMode: '', // "EDIT" or "CREATE"
    workoutId: '', // Might be current edited workout or newly created workout
    // workoutDuration: 0, // in milliseconds
  },
  reducers: {
    setEditedWorkout(state, action) {
      return {
        ...state, ...action.payload,
      };
    },
    setEditedWorkoutContent(state, action) {
      state.workoutContent = action.payload;
    },
    setEditedWorkoutTitle(state, action) {
      state.workoutTitle = action.payload;
    },
    clearEditedWorkout(state, action) {
      return {
        workoutTitle: '',
        workoutContent: [],
        // workoutDuration: 0, // in milliseconds
      };
    },
  },
});

export const {
  setEditedWorkout, clearEditedWorkout, setEditedWorkoutTitle, setEditedWorkoutContent,
} = editedWorkoutSlice.actions;

export default editedWorkoutSlice.reducer;
