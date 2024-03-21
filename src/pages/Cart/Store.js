// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './CartSlice'; // Assuming you have a cartSlice reducer
import shippingReducer from '../Shipping/Shipping'; // Import your shippingSlice reducer
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], // Exclude shipping reducer from persisting
};

const rootReducer = combineReducers({
  cart: cartReducer,
  shipping: shippingReducer,
  // Add more reducers here if you have them
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };
