import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import MovieRow from '../components/movie/MovieRow';
import FuturisticHero from '../components/home/FuturisticHero';
import Top10Trending from '../components/movie/Top10Trending';
import FeaturedCreators from '../components/home/FeaturedCreators';
import UpcomingReleases from '../components/home/UpcomingReleases';
import FuturisticFooter from '../components/layout/FuturisticFooter';
import { Play, Info } from 'lucide-react';


import { motion } from 'framer-motion';

const Home = () => {
   const [trending, setTrending] = useState([]);
   const [action, setAction] = useState([]);
   const [drama, setDrama] = useState([]);
   const [comedy, setComedy] = useState([]);


    useEffect(() => {
       const fetchMovies = async () => {
            try {
               const res = await axios.get('http://localhost:5000/api/videos');
               const movies = res.data;
                setTrending(movies);
                setAction(movies.filter(m => m.genre === 'Action'));

                setDrama(movies.filter(m => m.genre === 'Drama'));
                setComedy(movies.filter(m => m.genre === 'Comedy'));
            } catch (err) {
               console.error(err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="bg-netflix-black min-h-screen">
            <Navbar />

            {/* Futuristic Hero Section */}
            <FuturisticHero />

            {/* Top10Trending Section */}
            <Top10Trending 
             title="Top10Trending Now" 
                subtitle="Most watched this week"
                movies={trending}
            />

            {/* Featured Creators Section */}
            <FeaturedCreators />

            {/* Upcoming Releases Section */}
            <UpcomingReleases />

            {/* Futuristic Footer */}
            <FuturisticFooter />
        </div>
    );
};

export default Home;
