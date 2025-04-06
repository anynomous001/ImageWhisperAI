// store.ts
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '@/redux/reducers/imageReducers';
// Import any other reducers you might have

const store = configureStore({
    reducer: {
        image: imageReducer,
        // Add other reducers here
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;