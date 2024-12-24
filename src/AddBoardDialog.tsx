import { FormEvent, useRef, useState } from "react";
import { useBoardContext } from "./BoardContext";
import { useBoardExists } from "./useBoardExists";

export const ADD_BOARD_DIALOG_HEIGHT = "40px";

export function AddBoardDialog() {
  const [board, setBoard] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { checkBoardExistance, isLoading } = useBoardExists();
  const { boardContext } = useBoardContext();

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const doesBoardExist = await checkBoardExistance(board);

    if (!doesBoardExist) {
      return alert("This board does not exist");
    }

    boardContext.addBoard(board);
    closeDialog();
    setBoard("");
  }

  function openDialog() {
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <div
      className="AddBoardDialog"
      style={{
        height: ADD_BOARD_DIALOG_HEIGHT,
        display: "flex",
        placeContent: "center",
        padding: 8,
        borderBottom: `1px solid var(--neutral-60)`,
      }}
    >
      <button onClick={openDialog}>Add board</button>

      <dialog
        ref={dialogRef}
        style={{
          padding: "revert",
          margin: "revert",
          backgroundColor: "var(--neutral-90)",
          color: "var(--neutral-10)",
          borderColor: "var(--neutral-60)",
        }}
      >
        <button onClick={closeDialog} disabled={isLoading}>
          Close
        </button>

        <form onSubmit={handleFormSubmit}>
          <p>Enter the name of the board</p>
          <input
            ref={inputRef}
            type="text"
            name="board"
            required
            disabled={isLoading}
            value={board}
            onChange={(event) => setBoard(event.target.value)}
          />
          <button disabled={isLoading}>Add board</button>
        </form>
      </dialog>
    </div>
  );
}
