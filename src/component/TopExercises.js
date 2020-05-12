import React, { useEffect, useState } from "react";
import getAirtableBase from "../utils/getAirtableBase";
import { message } from "antd";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ReactComponent as AddWhite } from "../assets/Add_White.svg";
import { useExerciseContext } from "../context/ExerciseContext";
const TopExercisesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const TopExercise = styled.div`
  display: flex;
  background-color: rgb(216, 216, 216);
  border-radius: 4px;
  height: 100px;
  padding: 0.5rem;
  position: relative;
  .add-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0px 2px 10px 0 rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
  .name {
    align-self: flex-end;
    justify-self: flex-start;
  }
`;
function TopExercises() {
  const [exercises, setExercises] = useState([]);
  const { addExercise } = useExerciseContext();
  useEffect(() => {
    async function getTopExercises() {
      const base = getAirtableBase();
      try {
        const topExercies = await base("Exercises")
          .select({
            view: "Grid view",
            sort: [{ field: "Uses", direction: "desc" }],
          })
          .firstPage();

        setExercises(
          topExercies
            .map((record) => ({
              ...record.fields,
              id: record.id,
            }))
            .filter((record) => record.Name !== "Break")
            .slice(0, 10)
        );
      } catch (e) {
        message.error(`error occurred while loading top exercises`);
      }
    }
    getTopExercises();
  }, []);

  return (
    <div>
      <span style={{ marginBottom: "1rem" }}> Top Exercises</span>
      <TopExercisesWrapper>
        {exercises.map((exe) => (
          <TopExercise key={exe.id}>
            <AddWhite className="add-icon" onClick={() => addExercise(exe)} />
            <span className="name">{exe.Name}</span>
          </TopExercise>
        ))}
      </TopExercisesWrapper>
    </div>
  );
}
export default TopExercises;
