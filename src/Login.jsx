import React from "react";
import StarryNight from "./starryNight";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5eb084a46a0a4ff9a4c885b1bdd130da&response_type=code&redirect_uri=http://localhost:5173/search&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const SpotifyAPI = () => {
  return (
    <StarryNight> {/* Use StarryNight as the background */}
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="relative w-80 h-96 bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute w-80 h-96 bg-gradient-to-r from-fuchsia-500 via-fuchsia-800 to-transparent -top-1/2 -left-1/2 animate-spin-slow origin-bottom-right bg-gradient-spin"></div>

          <div className="absolute w-80 h-96 bg-gradient-to-r from-fuchsia-500 via-fuchsia-800 to-transparent -top-1/2 -left-1/2 animate-spin-slow origin-bottom-right bg-gradient-spin"></div>

          <div className="absolute inset-1 bg-gray-950 rounded-lg z-10 p-5">
            <h1 className="text-4xl text-center mb-6 animate-rainbow">Login</h1>

            <a
              href={AUTH_URL}
              className="block mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
            >
              Login with Spotify
            </a>

            {/* Takes you to home page */}
            <div className="flex justify-center mt-16 text-xs">
              <Link to="/home">
                <FontAwesomeIcon
                  icon={faHouse}
                  className="text-3xl text-teal-200 hover:text-violet-700"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </StarryNight>
  );
};

export default SpotifyAPI;