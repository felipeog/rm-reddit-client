import { createContext, Dispatch, SetStateAction } from "react";

type TBoardContext = {
  boards: string[];
  setBoards: Dispatch<SetStateAction<string[]>>;
  addBoard: (board: string) => void;
  removeBoard: (board: string) => void;
  reorderBoard: (from: string, to: string) => void;
};

export const BoardContext = createContext<TBoardContext>(
  null! as TBoardContext
);
