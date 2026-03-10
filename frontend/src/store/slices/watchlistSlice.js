import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        setWatchlistLoading: (state) => {
            state.loading = true;
        },
        setWatchlist: (state, action) => {
            state.items = action.payload;
            state.loading = false;
        },
        addToWatchlist: (state, action) => {
            if (!state.items.find(item => item._id === action.payload._id)) {
                state.items.push(action.payload);
            }
        },
        removeFromWatchlist: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        setWatchlistError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setWatchlistLoading,
    setWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    setWatchlistError
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
