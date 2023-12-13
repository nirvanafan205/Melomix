import React from "react";

const StarryNight = ({ children }) => {
  return (
    <div className="tw-relative tw-w-full tw-h-screen">
      <div
        className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-bg-black tw-bg-repeat tw-bg-center tw-z-0"
        style={{ backgroundImage: 'url("/static/stars.png")' }}
      ></div>
      <div
        className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-bg-transparent tw-bg-repeat tw-bg-center tw-z-1 tw-animate-move-twinkle-back"
        style={{ backgroundImage: 'url("/static/twinkling.png")' }}
      ></div>
      <div
        className="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-w-full tw-h-full tw-clouds tw-bg-clouds tw-opacity-40 tw-animate-move-clouds"
        style={{ backgroundImage: 'url("/static/clouds.png")' }}
      ></div>
      {children}
    </div>
  );
};

export default StarryNight;
