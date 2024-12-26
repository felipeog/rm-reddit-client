import { FormEvent, useRef, useState } from "react";
import { useBoardContext } from "./context/useBoardContext";
import { useBoardExists } from "./api/useBoardExists";

export const ADD_BOARD_DIALOG_HEIGHT = "50px";

export function AddBoardDialog() {
  const [board, setBoard] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { checkBoardExistence, isLoading } = useBoardExists();
  const { boardContext } = useBoardContext();

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();

    const doesBoardExist = await checkBoardExistence(board);

    if (!doesBoardExist) {
      return alert("This board does not exist.");
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
      className="AddBoardDialog flex flex-wrap place-content-center border-b border-neutral-300 dark:border-neutral-700"
      style={{ height: ADD_BOARD_DIALOG_HEIGHT }}
    >
      <button className="btn btn-sm" onClick={openDialog}>
        Add board
      </button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              disabled={isLoading}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">Add board</h3>
          <p className="py-4">Enter the name of the board</p>

          <form
            className="flex justify-between gap-4"
            onSubmit={handleFormSubmit}
          >
            <input
              className="input input-bordered grow"
              ref={inputRef}
              type="text"
              name="board"
              required
              disabled={isLoading}
              value={board}
              onChange={(event) => setBoard(event.target.value)}
            />
            <button className="btn shrink-0" disabled={isLoading}>
              Add board
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
