import "./App.css";
import { Player } from "@remotion/player";
import { MyComp } from "./MyComp";

function App() {
  return (
    <Player
      component={MyComp}
      compositionHeight={720}
      compositionWidth={1280}
      durationInFrames={200}
      fps={30}
      controls
      style={{
        maxWidth: 1280,
      }}
    ></Player>
  );
}

export default App;
