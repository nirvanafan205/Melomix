// starryNight component
/*

    .clouds {
        background: transparent url(clouds.png) repeat top center;
        z-index: 2;
        opacity: .4;
        animation: move;
    }

*/
import React from "react";

const StarryNight = () => {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-repeat bg-center z-0"
        style={{ backgroundImage: 'url("stars.png")' }}
      ></div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-transparent bg-repeat bg-center z-1 animate-move-twinkle-back"
        style={{ backgroundImage: 'url("twinkling.png")' }}
      ></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full clouds"></div>
    </div>
  );
};

export default StarryNight;
