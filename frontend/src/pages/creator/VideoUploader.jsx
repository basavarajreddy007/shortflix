import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, FileVideo, Image, Sparkles, CheckCircle, 
  AlertCircle, Loader, Wand2, Trash2, Play 
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VideoUploader= () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
   title: '',
    description: '',
   genre: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Documentary'];

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e, fileType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
     const file = e.dataTransfer.files[0];
      if (fileType === 'video' && file.type.startsWith('video/')) {
        handleVideoSelect(file);
      } else if (fileType === 'image' && file.type.startsWith('image/')) {
        handleThumbnailSelect(file);
      }
    }
  };

  // Handle video selection
  const handleVideoSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setError('');
      
      // Auto-generate AI thumbnail when video is selected
     generateAIThumbnail(file);
    } else {
      setError('Please select a valid video file');
    }
  };

  // Handle thumbnail selection
  const handleThumbnailSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
     const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    } else {
      setError('Please select a valid image file');
    }
  };

  // Generate AI Thumbnail from video
  const generateAIThumbnail = async (video) => {
    setGeneratingAI(true);
    try {
      // Create a canvas to extract frame from video
     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');
     const videoElement = document.createElement('video');

      videoElement.src = URL.createObjectURL(video);
      videoElement.crossOrigin = 'anonymous';

      await new Promise((resolve) => {
        videoElement.onloadeddata = resolve;
      });

      // Wait for video to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Set canvas dimensions to match video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Extract frame at 30% of video duration (best moment)
      videoElement.currentTime = videoElement.duration * 0.3;

      await new Promise((resolve) => {
        videoElement.onseeked = resolve;
      });

      // Draw frame to canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
       const aiThumbnail = new File([blob], 'ai-thumbnail.jpg', { type: 'image/jpeg' });
        setThumbnailFile(aiThumbnail);
        setThumbnailPreview(URL.createObjectURL(blob));
        setGeneratingAI(false);
      }, 'image/jpeg', 0.9);

    } catch (err) {
     console.error('AI Thumbnail generation failed:', err);
      setGeneratingAI(false);
      setError('Failed to generate AI thumbnail. Please upload manually.');
    }
  };

  // Enhance thumbnail with AI (filters, optimization)
  const enhanceWithAI = async () => {
    if (!thumbnailFile) return;

    setGeneratingAI(true);
    try {
      // Simulate AI enhancement (in production, call backend AI API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Apply enhancements using canvas
     const img = new Image();
      img.src = thumbnailPreview;
      
      await new Promise(resolve => {
        img.onload = resolve;
      });

     const canvas = document.createElement('canvas');
     const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
     const data = imageData.data;

      // Apply simple enhancement (brightness, contrast, saturation boost)
      for (let i = 0; i < data.length; i += 4) {
        // Brightness boost
        data[i] = Math.min(255, data[i] * 1.1);     // R
        data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
        data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
        
        // Contrast enhancement
       const factor = 1.2;
        data[i] = factor * (data[i] -128) + 128;
        data[i +1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert back to blob
      canvas.toBlob((blob) => {
       const enhancedThumbnail = new File([blob], 'enhanced-thumbnail.jpg', { type: 'image/jpeg' });
        setThumbnailFile(enhancedThumbnail);
        setThumbnailPreview(URL.createObjectURL(blob));
        setGeneratingAI(false);
      }, 'image/jpeg', 0.95);

    } catch (err) {
     console.error('AI enhancement failed:', err);
      setGeneratingAI(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!videoFile || !thumbnailFile) {
      setError('Please upload both video and thumbnail');
      return;
    }

    if (!formData.title || !formData.description || !formData.genre) {
      setError('Please fill in all fields');
      return;
    }

    setUploading(true);
    setError('');

   const uploadFormData = new FormData();
    uploadFormData.append('video', videoFile);
    uploadFormData.append('thumbnail', thumbnailFile);
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('genre', formData.genre);

    try {
     const token = localStorage.getItem('token');
     const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };

     const response = await axios.post('http://localhost:5000/api/videos/upload', uploadFormData, config);

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Remove files
  const removeVideo = () => {
    setVideoFile(null);
    setError('');
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setError('');
  };

 return (
    <div className="min-h-screen bg-netflix-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Upload Video
          </h1>
          <p className="text-gray-400">Share your content with AI-powered thumbnail generation</p>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-green-100 font-semibold">Video uploaded successfully! Redirecting...</span>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-400" />
            <span className="text-red-100">{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-lg font-semibold text-white mb-3">
              Video File
              <span className="text-red-400 ml-1">*</span>
            </label>

            {!videoFile ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${dragActive
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-gray-600 hover:border-purple-400 hover:bg-purple-500/10'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'video')}
              >
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleVideoSelect(e.target.files[0])}
                />
                
                <FileVideo className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-300 mb-2">Drag & drop your video here</p>
                <p className="text-gray-500 text-sm">or click to browse</p>
                <p className="text-gray-600 text-xs mt-2">MP4, WebM, MOV (Max 500MB)</p>
              </div>
            ) : (
              <div className="relative border border-cyan-400/50 rounded-xl p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                <button
                  type="button"
                  onClick={removeVideo}
                  className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold truncate">{videoFile.name}</p>
                    <p className="text-gray-400 text-sm">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    
                    {generatingAI && (
                      <div className="flex items-center gap-2 mt-2 text-cyan-400 text-sm">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>AI generating thumbnail...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Thumbnail Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <label className="block text-lg font-semibold text-white">
                Thumbnail
                <span className="text-red-400 ml-1">*</span>
              </label>
              
              {thumbnailPreview && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={enhanceWithAI}
                  disabled={generatingAI}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Enhance with AI</span>
                </motion.button>
              )}
            </div>

            {!thumbnailPreview ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${dragActive
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-gray-600 hover:border-cyan-400 hover:bg-cyan-500/10'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'image')}
              >
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleThumbnailSelect(e.target.files[0])}
                />

                {generatingAI ? (
                  <div className="flex flex-col items-center">
                    <Loader className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-spin" />
                    <p className="text-cyan-400 font-semibold">AI is extracting best frame...</p>
                    <p className="text-gray-500 text-sm mt-2">This will take a moment</p>
                  </div>
                ) : (
                  <>
                    <Image className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-300 mb-2">Drag & drop your thumbnail here</p>
                    <p className="text-gray-500 text-sm">or click to browse</p>
                    <p className="text-gray-600 text-xs mt-2">JPG, PNG (Min 1280x720)</p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-purple-400 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>AI auto-generates thumbnail from video</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="relative border border-purple-400/50 rounded-xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-4 right-4 z-20 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>

                <div className="aspect-video relative">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {generatingAI && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <div className="flex flex-col items-center">
                        <Loader className="w-12 h-12 text-cyan-400 animate-spin mb-2" />
                        <span className="text-cyan-400 font-semibold">AI enhancing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Video Details Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-lg font-semibold text-white mb-2">
                Title
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter video title"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-white mb-2">
                Description
                <span className="text-red-400 ml-1">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your video"
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-white mb-2">
                Genre
                <span className="text-red-400 ml-1">*</span>
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-netflix-dark">Select a genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-netflix-dark">
                    {genre}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={uploading || !videoFile || !thumbnailFile}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader className="w-6 h-6 animate-spin" />
                <span>Uploading... {uploadProgress}%</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Upload className="w-6 h-6" />
                <span>Upload Video</span>
              </div>
            )}
          </motion.button>

          {/* Progress Bar */}
          {uploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="w-full h-2 bg-gray-700 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              />
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VideoUploader;
