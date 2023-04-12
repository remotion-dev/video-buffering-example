import React, { useCallback, useMemo, useRef, createContext } from "react";

type BufferState = { [key: string]: boolean };

type BufferContextType = {
  canPlay: (id: string) => void;
  needsToBuffer: (id: string) => void;
};

export const BufferContext = createContext<BufferContextType>({
  // By default, do nothing if the context is not set, for example in rendering
  canPlay: () => {},
  needsToBuffer: () => {},
});

export const BufferManager: React.FC<{
  children: React.ReactNode;
  onBuffer: () => void;
  onContinue: () => void;
}> = ({ children, onBuffer, onContinue }) => {
  const bufferState = useRef<BufferState>({});
  const currentState = useRef(false);

  const sendEvents = useCallback(() => {
    let previousState = currentState.current;
    currentState.current = Object.values(bufferState.current).some(Boolean);

    if (currentState.current && !previousState) {
      onBuffer();
    } else if (!currentState.current && previousState) {
      onContinue();
    }
  }, []);

  const canPlay = useCallback((id: string) => {
    bufferState.current[id] = false;
    sendEvents();
  }, []);

  const needsToBuffer = useCallback((id: string) => {
    bufferState.current[id] = true;
    sendEvents();
  }, []);

  const bufferEvents = useMemo(() => {
    return {
      canPlay,
      needsToBuffer,
    };
  }, []);

  return (
    <BufferContext.Provider value={bufferEvents}>
      {children}
    </BufferContext.Provider>
  );
};
