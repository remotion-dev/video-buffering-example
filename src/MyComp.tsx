import React from "react";
import { Series, Video } from "remotion";

export const MyComp: React.FC = () => {
  return (
    <Series>
      <Series.Sequence
        durationInFrames={100}
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
          backgroundColor: "yellow",
        }}
      >
        Video will start shortly
      </Series.Sequence>
      <Series.Sequence durationInFrames={100}>
        <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></Video>
      </Series.Sequence>
    </Series>
  );
};
