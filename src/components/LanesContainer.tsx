import { AddBoardDialog } from "./AddBoardDialog";
import { Lane } from "./Lane";
import { useBoardContext } from "../context/useBoardContext";
import {
  useSensors,
  useSensor,
  PointerSensor,
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MeasuringStrategy,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";

export function LanesContainer() {
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const { boardContext } = useBoardContext();
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragCancel() {
    setActiveId(undefined);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && over.id !== active.id) {
      boardContext.setBoards((prevBoards) => {
        const oldIndex = prevBoards.indexOf(String(active.id));
        const newIndex = prevBoards.indexOf(String(over.id));

        return arrayMove(prevBoards, oldIndex, newIndex);
      });
    }

    setActiveId(undefined);
  }

  return (
    <div className="LanesContainer h-dvh flex overflow-y-scroll">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToHorizontalAxis]}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      >
        <SortableContext
          items={boardContext.boards}
          strategy={horizontalListSortingStrategy}
        >
          {boardContext.boards.map((board) => (
            <Lane key={board} board={board} isDragging={board === activeId} />
          ))}
        </SortableContext>
      </DndContext>

      <AddBoardDialog />
    </div>
  );
}
