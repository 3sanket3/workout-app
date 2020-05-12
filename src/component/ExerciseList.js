import React from "react";
import styled from "styled-components";
import ExerciseCard from "./ExerciseCard";
import Card from "../styles/Card";

const StyledList = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
`;
function ExerciseList({ exercises }) {
  return (
    <StyledList>
      {exercises.map((ex, index) => (
        <ExerciseCard exercise={ex} key={index} />
      ))}
    </StyledList>
  );
}

export default ExerciseList;
