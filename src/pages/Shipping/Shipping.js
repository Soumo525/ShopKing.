import { createSlice } from '@reduxjs/toolkit';

const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    info: [],
  },
  reducers: {
    addInfo: (state, action) => {
      const newItem = action.payload;
      state.info = [...state.info, newItem];
    },
    removeInfo: (state, action) => {
      const itemId = action.payload;
      state.info = state.info.filter(item => item.id !== action.payload.id);
    },
    resetShipping: (state) => {
      state.info = [];
    },
  },
});

export const { addInfo, removeInfo,resetShipping } = shippingSlice.actions;
export default shippingSlice.reducer;
