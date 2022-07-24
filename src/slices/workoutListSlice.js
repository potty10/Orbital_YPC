import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';
import { db } from "../../firebase";
// https://hybridheroes.de/blog/2021-01-08-redux-toolkit-react-native/
//https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk

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

const workoutListSlice = createSlice({
  name: "workoutList",
  initialState: {
      workoutList: [],
      isLoading: false
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
    })
  }
});



export default workoutListSlice.reducer;
