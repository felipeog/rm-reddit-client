import { createContext } from "react";

type TBoardContext = {
  boards: string[];
  addBoard: (board: string) => void;
  removeBoard: (board: string) => void;
  reorderBoard: (from: string, to: string) => void;
};

export const BoardContext = createContext<TBoardContext>(
  null! as TBoardContext
);
