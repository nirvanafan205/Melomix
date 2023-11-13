import React, { useState, useEffect } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import './ArtistCarousel.css';

const ArtistCarousel = ({ artists , accessToken }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const handleSelect = (selectedIndex, e) => {
        setFade(false);
        setIndex(selectedIndex);
    };

    useEffect(() => {
        setFade(true);
    }, [index]);


    return (
        <div className="carousel-container">
            <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} interval={null}>
                {artists.map((artist, idx) => (
                    <Carousel.Item key={artist.id} className={` ${fade && idx === index ? 'fade-in' : ''}`}>
                        <div className= "carousel-portrait">
                        <img
                            className=" carousel-img d-block w-100 rounded-5"
                            src={artist.portraitUrl}
                            alt={artist.name}
                        />
                            <h3>{artist.name}</h3>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default ArtistCarousel;