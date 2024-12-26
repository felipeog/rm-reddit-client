import { AddBoardDialog } from "./AddBoardDialog";
import { ChevronUpIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { DragEvent } from "react";
import { useBoardContent } from "../api/useBoardContent";
import { useBoardContext } from "../context/useBoardContext";

export function LanesContainer() {
  const { boardContext } = useBoardContext();

  return (
    <div className="LanesContainer h-dvh flex overflow-x-scroll">
      {boardContext.boards.map((board) => (
        <Lane key={board} board={board} />
      ))}

      <AddBoardDialog />
    </div>
  );
}

type TLaneProps = {
  board: string;
};

function Lane(props: TLaneProps) {
  const { boardContext } = useBoardContext();
  const { boardContent, isLoading, loadMore, refresh } = useBoardContent(
    props.board
  );

  function onDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData("text/plain", props.board);
  }

  function onDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    const board = event.dataTransfer.getData("text/plain");
    if (board !== props.board) {
      boardContext.reorderBoard(board, props.board);
    }
  }

  return (
    <div
      className="Lane w-[30vw] min-w-[350px] h-full border-r border-neutral-300 dark:border-neutral-700 overflow-y-scroll"
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex justify-between align-center sticky top-0 p-4 bg-base-100">
        <p>
          <a
            className="link"
            href={`https://www.reddit.com/r/${props.board}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            /r/{props.board}
          </a>
        </p>

        <div className="dropdown dropdown-bottom dropdown-end">
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <div tabIndex={0} role="button">
              <EllipsisVerticalIcon className="size-6" />
            </div>
          )}

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button
                onClick={() => boardContext.removeBoard(props.board)}
                disabled={isLoading}
              >
                Delete
              </button>
            </li>
            <li>
              <button onClick={refresh} disabled={isLoading}>
                Refresh
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4">
        {boardContent.length > 0
          ? boardContent.map((item) => (
              <div
                className="flex gap-4 items-center py-4 border-b border-neutral-300 dark:border-neutral-700"
                key={item.name}
              >
                <div className="flex flex-col items-center">
                  <ChevronUpIcon className="size-6" />
                  <p className="text-center">{item.ups}</p>
                </div>

                <a
                  className="link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </div>
            ))
          : null}
      </div>

      <button className="btn m-4" onClick={loadMore} disabled={isLoading}>
        Load more
      </button>
    </div>
  );
}
