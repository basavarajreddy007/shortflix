import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentVideo: null,
  videos: [],
  loading: false,
  error: null,
  // Video interactions (persisted in localStorage)
  interactions: {}, // { [videoId]: { likes, hasLiked, hasDisliked, isSaved, comments } }
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
 reducers: {
   setVideosLoading: (state) => {
      state.loading = true;
    },
   setVideos: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
   setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
   setVideosError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    // Interaction actions
   setLikes: (state, action) => {
     const { videoId, likes } = action.payload;
      if (!state.interactions[videoId]) {
        state.interactions[videoId] = {};
      }
      state.interactions[videoId].likes = likes;
    },
    toggleLike: (state, action) => {
     const { videoId} = action.payload;
      if (!state.interactions[videoId]) {
        state.interactions[videoId] = { likes: 0 };
      }
      
     const interaction = state.interactions[videoId];
      if (interaction.hasLiked) {
        interaction.likes = Math.max(0, interaction.likes - 1);
        interaction.hasLiked = false;
      } else {
        interaction.likes += 1;
        interaction.hasLiked = true;
        if (interaction.hasDisliked) {
          interaction.hasDisliked = false;
        }
      }
    },
    toggleDislike: (state, action) => {
     const { videoId} = action.payload;
      if (!state.interactions[videoId]) {
        state.interactions[videoId] = { likes: 0 };
      }
      
     const interaction= state.interactions[videoId];
      if (interaction.hasDisliked) {
        interaction.hasDisliked = false;
      } else {
        interaction.hasDisliked = true;
        if (interaction.hasLiked) {
          interaction.likes = Math.max(0, interaction.likes -1);
          interaction.hasLiked = false;
        }
      }
    },
    toggleSave: (state, action) => {
     const { videoId} = action.payload;
      if (!state.interactions[videoId]) {
        state.interactions[videoId] = { likes: 0 };
      }
      state.interactions[videoId].isSaved = !state.interactions[videoId].isSaved;
    },
    addComment: (state, action) => {
     const { videoId, comment } = action.payload;
      if (!state.interactions[videoId]) {
        state.interactions[videoId] = { likes: 0, comments: [] };
      }
      if (!state.interactions[videoId].comments) {
        state.interactions[videoId].comments = [];
      }
      state.interactions[videoId].comments.unshift(comment);
    },
    loadInteractions: (state, action) => {
     const { videoId, data } = action.payload;
      state.interactions[videoId] = data;
    },
  },
});

export const {
  setVideosLoading,
  setVideos,
  setCurrentVideo,
  setVideosError,
  setLikes,
  toggleLike,
  toggleDislike,
  toggleSave,
  addComment,
  loadInteractions,
} = videoSlice.actions;

export default videoSlice.reducer;
