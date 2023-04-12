import "./App.css";
import { Player, PlayerRef, RenderPoster } from "@remotion/player";
import { MyComp } from "./MyComp";
import { useCallback, useRef, useState } from "react";
import { AbsoluteFill } from "remotion";
import { BufferManager } from "./BufferManager";

function App() {
  const playerRef = useRef<PlayerRef>(null);
  const [buffering, setBuffering] = useState(false);
  let pausedBecauseOfBuffering = useRef(false);

  const onBuffer = useCallback(() => {
    setBuffering(true);

    playerRef.current?.pause();
    pausedBecauseOfBuffering.current = true;
  }, []);

  const onContinue = useCallback(() => {
    setBuffering(false);

    // Play only if we paused because of buffering
    if (pausedBecauseOfBuffering.current) {
      pausedBecauseOfBuffering.current = false;
      playerRef.current?.play();
    }
  }, []);

  const renderPoster: RenderPoster = useCallback(() => {
    if (buffering) {
      return (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 100,
          }}
        >
          ⏳
        </AbsoluteFill>
      );
    }
    return null;
  }, [buffering]);

  return (
    <BufferManager onBuffer={onBuffer} onContinue={onContinue}>
      <Player
        ref={playerRef}
        component={MyComp}
        compositionHeight={720}
        compositionWidth={1280}
        durationInFrames={200}
        fps={30}
        controls
        renderPoster={renderPoster}
        showPosterWhenPaused
        style={{
          maxWidth: 1280,
        }}
      ></Player>
    </BufferManager>
  );
}

export default App;
