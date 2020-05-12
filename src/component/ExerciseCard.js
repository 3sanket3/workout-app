import React from "react";
import ItemCard from "../styles/ItemCard";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ReactComponent as DragIcon } from "../assets/Drag.svg";
import { ReactComponent as DeleteIcon } from "../assets/Delete.svg";
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

const ExerciseCardStyle = styled(ItemCard)`
  .header {
    display: flex;
    justify-content: space-between;
  }

  .delete-icon {
    display: none;
  }
  &:hover {
    box-shadow: 16px 16px 30px 0 rgba(0, 0, 0, 0.1),
      -16px -16px 30px 0 rgb(255, 255, 255);
    .delete-icon {
      display: inline;
      cursor: pointer;
    }
  }
`;
function ExerciseCard({ exercise, index, deleteExercise, ...rest }) {
  return (
    <Draggable draggableId={exercise.key} index={index} {...rest}>
      {(provided) => (
        <ExerciseCardStyle
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="header">
            <h3>
              <DragIcon style={{ marginRight: "0.5rem" }}></DragIcon>
              <strong>{exercise.Name}</strong>{" "}
              {exercise.type === "break" ? exercise.Duration : null}
            </h3>
            <DeleteIcon
              onClick={() => {
                deleteExercise && deleteExercise(exercise);
              }}
              className="delete-icon"
            ></DeleteIcon>
          </div>
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
        </ExerciseCardStyle>
      )}
    </Draggable>
  );
}

export default ExerciseCard;
