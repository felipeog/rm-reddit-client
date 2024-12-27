import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useBoardContext } from "../context/useBoardContext";
import { useBoardExists } from "../api/useBoardExists";
import { PlusIcon } from "@heroicons/react/24/solid";
import { enqueueSnackbar } from "notistack";

export function AddBoardDialog() {
  const [board, setBoard] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { checkBoardExistence, isLoading } = useBoardExists();
  const { boardContext } = useBoardContext();

  async function handleBoardFormSubmit(event: FormEvent) {
    event.preventDefault();

    if (boardContext.boards.includes(board)) {
      return enqueueSnackbar("This board has already been added.");
    }

    try {
      const doesBoardExist = await checkBoardExistence(board);

      if (!doesBoardExist) {
        return enqueueSnackbar("This board does not exist.");
      }

      boardContext.addBoard(board);
      closeDialog();
      enqueueSnackbar("Board added.");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error checking board existence.");
    }
  }

  function handleDialogFormSubmit() {
    setBoard("");
  }

  function openDialog() {
    dialogRef.current?.show();
    inputRef.current?.focus();
  }

  function closeDialog() {
    dialogRef.current?.close();
    setBoard("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setBoard(event.target.value);
  }

  return (
    <div className="AddBoardDialog w-[30vw] min-w-[350px]">
      <button className="btn btn-circle m-4" onClick={openDialog}>
        <PlusIcon className="size-6 " />
      </button>

      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeDialog}
            disabled={isLoading}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Add board</h3>
          <p className="py-4">Enter the name of the board</p>

          <form
            className="flex justify-between gap-4"
            onSubmit={handleBoardFormSubmit}
          >
            <input
              className="input input-bordered grow"
              ref={inputRef}
              type="text"
              name="board"
              required
              disabled={isLoading}
              value={board}
              onChange={handleInputChange}
            />
            <button className="btn shrink-0" disabled={isLoading}>
              Add board
            </button>
          </form>
        </div>

        <form
          method="dialog"
          onSubmit={handleDialogFormSubmit}
          className="modal-backdrop bg-neutral-950 opacity-60"
        >
          <button>Close dialog</button>
        </form>
      </dialog>
    </div>
  );
}
