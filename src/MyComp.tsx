import React from "react";
import { Series } from "remotion";
import { PausableVideo } from "./PausableVideo";

export const MyComp: React.FC = () => {
  return (
    <Series>
      <Series.Sequence
        durationInFrames={100}
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
          backgroundColor: "black",
        }}
      >
        Video will start shortly
      </Series.Sequence>
      <Series.Sequence durationInFrames={100}>
        <PausableVideo src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></PausableVideo>
      </Series.Sequence>
    </Series>
  );
};
