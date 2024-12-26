import {
  ArrowsRightLeftIcon,
  ChevronUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/solid";
import { CSS } from "@dnd-kit/utilities";
import { useBoardContent } from "../api/useBoardContent";
import { useBoardContext } from "../context/useBoardContext";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";

type TLaneProps = {
  board: string;
  isDragging: boolean;
};

export function Lane(props: TLaneProps) {
  const { boardContext } = useBoardContext();
  const { boardContent, isLoading, loadMore, refresh } = useBoardContent(
    props.board
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.board,
      animateLayoutChanges: (args) =>
        defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
    });

  return (
    <div
      className="Lane w-[30vw] min-w-[350px] h-full bg-base-100 border-r border-neutral-300 dark:border-neutral-700 overflow-y-scroll"
      ref={setNodeRef}
      style={{
        zIndex: props.isDragging ? 10 : 0,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
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

        <div className="flex gap-3">
          <button className="cursor-move" {...attributes} {...listeners}>
            <ArrowsRightLeftIcon className="size-6" />
          </button>

          <div className="dropdown dropdown-bottom dropdown-end">
            <div className="w-[24px] h-[24px] flex place-content-center">
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <div tabIndex={0} role="button">
                  <EllipsisVerticalIcon className="size-6" />
                </div>
              )}
            </div>

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