import {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Internals,
  OffthreadVideo,
  RemotionMainVideoProps,
  RemotionVideoProps,
  Video,
} from "remotion";
import { BufferContext } from "./BufferManager";

const PausableVideoFunction: React.ForwardRefRenderFunction<
  HTMLVideoElement,
  RemotionVideoProps & RemotionMainVideoProps
> = ({ src, ...props }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const id = useId();

  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  const { canPlay, needsToBuffer } = useContext(BufferContext);

  useEffect(() => {
    const { current } = videoRef;
    if (!current) {
      return;
    }

    const onPlay = () => {
      canPlay(id);
    };

    const onBuffer = () => {
      needsToBuffer(id);
    };

    current.addEventListener("canplay", onPlay);
    current.addEventListener("waiting", onBuffer);

    return () => {
      current.removeEventListener("canplay", onPlay);
      current.removeEventListener("waiting", onBuffer);
    };
  }, []);

  if (Internals.getRemotionEnvironment() === "rendering") {
    return <OffthreadVideo {...props} src={src as string}></OffthreadVideo>;
  }

  return <Video {...props} ref={videoRef} src={src}></Video>;
};

export const PausableVideo = forwardRef(PausableVideoFunction);
