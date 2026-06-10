import React from 'react';
import Navbar from '../Components/Navbar';
import MediaCard from '../Components/MediaCard';
import HeroBanner from '../Components/Banner';


function HomePage() {
    return (
        <>
            <Navbar />
            <HeroBanner/>
             <MediaCard/>

        </>
    );
}

export default HomePage;