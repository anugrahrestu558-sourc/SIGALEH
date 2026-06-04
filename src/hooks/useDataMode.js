import { useState } from "react";

function useDataMode() {
  const [mode, setMode] = useState("MOCK"); 
  // MOCK | API | SIM

  return {
    mode,
    setMode,
    isMock: mode === "MOCK",
    isAPI: mode === "API",
    isSim: mode === "SIM",
  };
}

export default useDataMode;