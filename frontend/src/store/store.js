import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';
import watchlistReducer from './slices/watchlistSlice';
import playerReducer from './slices/playerSlice';
import videoReducer from './slices/videoSlice';

export const store = configureStore({
   reducer: {
       auth: authReducer,
        movies: movieReducer,
        watchlist: watchlistReducer,
        player: playerReducer,
        video: videoReducer,
    },
    middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
           serializableCheck: false,
        }),
});

export default store;
