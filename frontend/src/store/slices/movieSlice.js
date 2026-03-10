import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trending: [],
    popular: [],
    recommended: [],
    currentMovie: null,
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMoviesLoading: (state) => {
            state.loading = true;
        },
        setTrending: (state, action) => {
            state.trending = action.payload;
            state.loading = false;
        },
        setPopular: (state, action) => {
            state.popular = action.payload;
            state.loading = false;
        },
        setRecommended: (state, action) => {
            state.recommended = action.payload;
            state.loading = false;
        },
        setCurrentMovie: (state, action) => {
            state.currentMovie = action.payload;
        },
        setMoviesError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setMoviesLoading,
    setTrending,
    setPopular,
    setRecommended,
    setCurrentMovie,
    setMoviesError
} = movieSlice.actions;

export default movieSlice.reducer;
