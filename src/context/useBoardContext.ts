import { useContext } from "react";
import { BoardContext } from "./BoardContext";

export function useBoardContext() {
  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error(
      "useBoardContext has to be used within BoardContextProvider."
    );
  }

  return { boardContext };
}
