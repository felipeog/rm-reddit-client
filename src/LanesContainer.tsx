import { ADD_BOARD_DIALOG_HEIGHT } from "./AddBoardDialog";
import { useBoardContent } from "./useBoardContent";
import { useBoardContext } from "./BoardContext";
import { formatDate } from "./formatDate";

export function LanesContainer() {
  const { boardContext } = useBoardContext();

  return (
    <div
      className="LanesContainer"
      style={{
        display: "flex",
        height: `calc(100vh - ${ADD_BOARD_DIALOG_HEIGHT})`,
        overflowX: "scroll",
      }}
    >
      {boardContext.boards.map((board) => (
        <Lane key={board} board={board} />
      ))}
    </div>
  );
}

type TLaneProps = {
  board: string;
};

function Lane(props: TLaneProps) {
  const { boardContext } = useBoardContext();
  const { boardContent, isLoading, loadMore } = useBoardContent(props.board);

  return (
    <div
      className="Lane"
      style={{
        width: "30vw",
        minWidth: "30vw",
        height: "100%",
        borderRight: "1px solid var(--neutral-60)",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "var(--neutral-90)",
          paddingBottom: 10,
        }}
      >
        <h1>
          <a
            href={`https://www.reddit.com/r/${props.board}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.board}
          </a>
        </h1>
        <button onClick={() => boardContext.removeBoard(props.board)}>
          Remove board
        </button>
      </div>

      <div>
        {boardContent.length > 0
          ? boardContent.map((item) => (
              <div key={item.name}>
                <p>
                  Title:{" "}
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </p>
                <p>Author: {item.author}</p>
                <p>Created: {formatDate(item.created * 1000)}</p>
                <p>
                  Ups/Downs: {item.ups}/{item.downs}
                </p>
                <br />
              </div>
            ))
          : null}
      </div>

      <button onClick={loadMore} disabled={isLoading}>
        Load more
      </button>
    </div>
  );
}