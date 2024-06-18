import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.jsx'
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    user: userReducer
 },
 preloadedState,
})
store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

