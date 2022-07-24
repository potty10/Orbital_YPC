import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { db } from "../../firebase";
// https://hybridheroes.de/blog/2021-01-08-redux-toolkit-react-native/
// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
// https://redux.js.org/tutorials/essentials/part-5-async-logic
// https://redux.js.org/tutorials/essentials/part-6-performance-normalization
// https://dev.to/julfikarhaidar/redux-toolkit-crud-example-with-react-hooks-4d98

export const loadAllWorkouts = createAsyncThunk('workoutList/loadAllWorkouts', async () => {
  const auth = getAuth()
  const q = query(collection(db, "user_workouts"), where("userId", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  let exerciseList = [];
  querySnapshot.forEach((doc) => {
    let workoutItem = doc.data();
    workoutItem.workoutId = doc.id
    exerciseList.push(workoutItem);
  });  
  return exerciseList
  // Note: querySnapshot is not an array, DOES NOT have the map function
  // return querySnapshot.map(doc => {
  //   let item = doc.data()
  //   item.id = doc.id
  //   return item
  // });
});

export const deleteWorkoutById = createAsyncThunk('workoutList/deleteWorkoutById', async (workoutId, {rejectWithValue}) => {
  try {
    const auth = getAuth()
    await deleteDoc(doc(db, "user_workouts", workoutId));
    return workoutId
  } catch(err) {
    // Properties code, message, name
    return rejectWithValue(err);
  }
});

export const addWorkout = createAsyncThunk('workoutList/addWorkout', async () => {
  const auth = getAuth()
  const q = query(collection(db, "user_workouts"), where("userId", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  let exerciseList = [];
  querySnapshot.forEach((doc) => {
    let workoutItem = doc.data();
    workoutItem.workoutId = doc.id
    exerciseList.push(workoutItem);
  });  
  return exerciseList
  // Note: querySnapshot is not an array, DOES NOT have the map function
  // return querySnapshot.map(doc => {
  //   let item = doc.data()
  //   item.id = doc.id
  //   return item
  // });
});

const workoutListSlice = createSlice({
  name: "workoutList",
  initialState: {
      workoutList: [],
      isLoading: false,
      error: ""
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadAllWorkouts.pending, state => {
      state.loading = true
    })
    builder.addCase(loadAllWorkouts.fulfilled, (state, action) => {
      state.workoutList = action.payload
      state.loading = false
    })
    builder.addCase(loadAllWorkouts.rejected, state => {
      state.loading = false
      state.error = action.payload.message;
    })
    builder.addCase(deleteWorkoutById.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteWorkoutById.fulfilled, (state, action) => {
      state.workoutList = state.workoutList.filter((item) => item.workoutId !== action.payload);
      // let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
      // state.workoutList = action.payload
      state.loading = false
    })
    builder.addCase(deleteWorkoutById.rejected, state => {
      state.loading = false
      state.error = action.payload.message;
    })
  }
});



export default workoutListSlice.reducer;
