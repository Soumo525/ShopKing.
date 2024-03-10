import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.$id === item.$id);

      if (existingItem) {
        existingItem.quantity += item.quantity; // Increment the quantity if the item already exists
      } else {
        state.items.push(item); // Add the item to the cart if it's not already there
      }
    },
    // Other reducers...
    removeItem(state, action) {
      state.items = state.items.filter(item => item.$id !== action.payload.id);
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    resetItem: (state) => {
      state.items = [];
    },
    resetTotal: (state) => {
      state.total = 0;
    },


  },
});

export const { addItem, removeItem,setTotal,resetItem,resetTotal} = cartSlice.actions;
export default cartSlice.reducer;
