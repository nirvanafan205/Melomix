import React from "react";

// component receives two props:
// track, representing the details of a specific track
// chooseTrack, a function to handle track selection
const TrackSearchResult = ({ track, chooseTrack }) => {
  // Handling Track Selection
  function handlePlay() {
    chooseTrack(track);

    //  called when the user clicks on the search result.
    // It invokes the chooseTrack function, passing the track details.
  }

  // Rendering Track Information
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3 d-flex flex-column">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
