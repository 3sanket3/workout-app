import React from "react";
import ItemCard from "../styles/ItemCard";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 2px 2px 4px 0 rgba(25, 25, 25, 0.12),
    -2px -2px 4 0 rgba(255, 255, 255, 0.5);
  border-radius: 10;
`;
function ExerciseCard({ exercise, index, ...rest }) {
  return (
    <Draggable draggableId={exercise.key} index={index} {...rest}>
      {(provided) => (
        <ItemCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3>
            <strong>{exercise.Name}</strong>{" "}
            {exercise.type === "break" ? exercise.Duration : null}
          </h3>

          {exercise.type === "exercise" && (
            <MetaInfo>
              <Info>
                <span>SETS</span>
                <strong>{exercise.Sets}</strong>
              </Info>
              <Info>
                <span>REPS</span>
                <strong>{exercise.Repetition}</strong>
              </Info>
              <Info>
                <span>Time</span>
                <strong>{exercise.Duration}</strong>
              </Info>
              <Info>
                <span>Rest</span>
                <strong>{exercise["Rest Between"]}</strong>
              </Info>
            </MetaInfo>
          )}
        </ItemCard>
      )}
    </Draggable>
  );
}

export default ExerciseCard;
