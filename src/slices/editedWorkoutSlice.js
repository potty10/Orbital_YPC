import { createSlice } from "@reduxjs/toolkit";

const editedWorkoutSlice = createSlice({
  name: "editedWorkout",
  initialState: {
    workoutTitle: "",
    workoutContent: [],
    // workoutDuration: 0, // in milliseconds
  },
  reducers: {
    setEditedWorkout(state, action) {
      return {
          ...state, ...action.payload
      }
    },
    clearEditedWorkout(state, action) {
        return {
            workoutTitle: "",
            workoutContent: [],
            // workoutDuration: 0, // in milliseconds
        }
      },
  },
});

export const { setEditedWorkout, clearEditedWorkout } = editedWorkoutSlice.actions;

export default editedWorkoutSlice.reducer;
