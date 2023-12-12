import React, { useState, useEffect } from "react";
import { Button, Carousel } from "react-bootstrap";
import { getArtistFromName } from "../../../server/api/spotifyAPI";
import "./ArtistCarousel.css";

const ArtistCarousel = ({ artists }) => {
  //provide list of artist names, get their id, and then
  //get images and names and etc automatically
  const [artistDetails, setArtistDetails] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  //handle selection
  const handleSelect = (selectedIndex, e) => {
    setFade(false);
    setIndex(selectedIndex);
  };

  //fade effect
  useEffect(() => {
    setFade(true);
  }, [index]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const details = await Promise.all(
        artists.map(async (artistName) => {
          const result = await getArtistFromName(artistName, 1);
          if (result.artists.items.length > 0) {
            const artist = result.artists.items[0];
            console.log(artist.name);
            return {
              name: artist.name,
              portraitUrl: artist.images[0]?.url,
            };
          }
          return null;
        })
      );
      setArtistDetails(details.filter((d) => d != null));
    };

    fetchArtistDetails();

    console.log(artists);
  }, [artists]);

  return (
    <div className="carousel-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        interval={null}
      >
        {artistDetails.map((artistDetail, idx) => (
          <Carousel.Item
            key={idx}
            className={` ${fade && idx === index ? "fade-in" : ""}`}
          >
            <div className="carousel-portrait">
              <img
                className=" carousel-img"
                src={artistDetail.portraitUrl}
                alt={artistDetail.name}
              />
              <h3>{artistDetail.name}</h3>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ArtistCarousel;
