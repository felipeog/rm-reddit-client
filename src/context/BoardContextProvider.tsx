import { ReactNode, useCallback, useEffect, useState } from "react";
import { BoardContext } from "./BoardContext";

const LOCAL_STORAGE_KEY = "@felipeog/rm-reddit-client/boards";

type TBoardContextProviderProps = {
  children: ReactNode;
};

export function BoardContextProvider(props: TBoardContextProviderProps) {
  const [boards, setBoards] = useState<string[]>(() => {
    const boardsString = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
    return JSON.parse(boardsString);
  });

  const addBoard = useCallback(
    (board: string) =>
      setBoards((prevBoards) => {
        if (prevBoards.includes(board)) return prevBoards;
        return [...prevBoards, board];
      }),
    []
  );

  const removeBoard = useCallback(
    (board: string) =>
      setBoards((prevBoards) =>
        prevBoards.filter((prevBoard) => prevBoard !== board)
      ),
    []
  );

  const reorderBoard = useCallback(
    (from: string, to: string) =>
      setBoards((prevBoards) => {
        const boards = [...prevBoards];
        const fromIndex = boards.indexOf(from);
        const toIndex = boards.indexOf(to);

        boards.splice(fromIndex, 1);
        boards.splice(toIndex, 0, from);

        return boards;
      }),
    []
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boards));
  }, [boards]);

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        removeBoard,
        reorderBoard,
      }}
    >
      {props.children}
    </BoardContext.Provider>
  );
}
