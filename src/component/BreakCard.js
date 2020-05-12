import React from "react";
import { ReactComponent as AddBlue } from "../assets/Add_Blue.svg";
import styled from "styled-components";
import ItemCard from "../styles/ItemCard";
import { useExerciseContext } from "../context/ExerciseContext";

const BreakCardStyle = styled(ItemCard)`
  display: flex;
  justify-content: space-between;

  .add-icon {
    border-radius: 50%;
    box-shadow: 0px 1px 3px 0 rgba(255, 255, 255, 0.2);
    padding: 6px;
    height: 32px;
    width: 32px;
    cursor: pointer;
  }
`;
function BreakCard({ breakObj }) {
  const { addExercise } = useExerciseContext();

  function addBreak() {
    addExercise(breakObj, "break");
  }
  return (
    <BreakCardStyle style={{ marginBottom: "1.5rem" }}>
      Add Break{" "}
      <div className="add-icon">
        <AddBlue onClick={() => addBreak()}>Add</AddBlue>
      </div>
    </BreakCardStyle>
  );
}

export default BreakCard;
