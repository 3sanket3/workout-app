import React, { useMemo } from "react";
import styled from "styled-components";
import ExerciseCard from "./ExerciseCard";
import Card from "../styles/Card";
import { DragDropContext, Droppable, Dragggable } from "react-beautiful-dnd";
import { useExerciseContext } from "../context/ExerciseContext";

const StyledList = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
`;
function ExerciseList() {
  const { exercises, replaceExercises } = useExerciseContext();
  function onDragEnd({ source, destination }) {
    console.log({ source, destination });
    if (!destination || destination.index === source.index) {
      return;
    }

    const clonedExercises = [...exercises];
    const [removedExe] = clonedExercises.splice(source.index, 1);
    clonedExercises.splice(destination.index, 0, removedExe);
    replaceExercises && replaceExercises([...clonedExercises]);
  }

  const List = () => {
    return exercises.map((exercise, index) => (
      <ExerciseCard exercise={exercise} index={index} key={exercise.key} />
    ));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <StyledList ref={provided.innerRef} {...provided.droppableProps}>
            {/* {exercises.map((ex, index) => (
              <ExerciseCard exercise={ex} index={index} key={ex.key} />
            ))} */}
            <List />
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ExerciseList;
