// reducers/imageDataReducer.js
import { createSlice } from '@reduxjs/toolkit';

const imageDataSlice = createSlice({
  name: 'imageData',
  initialState: {
    Imgdata:[]
  },
  reducers: {
    addData:(state, action) =>{
      const newItem = action.payload;
      state.Imgdata = [...state.Imgdata, newItem];
    }
   
  },
});

export const { addData } = imageDataSlice.actions;

export default imageDataSlice.reducer;
