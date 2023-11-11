import React from "react";

const StarryNight = ({children}) => {
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
      <div
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full clouds bg-clouds opacity-40 animate-move-clouds"
        style={{ backgroundImage: 'url("clouds.png")' }}
      ></div>

      {children}
    </div>
  );
};

export default StarryNight;