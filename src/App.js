import React, { useState, useEffect } from "react";
import AutoComplete from "./component/AutoComplete";
import { Button, message } from "antd";
import styled from "styled-components";
import Container from "./styles/Container";
import Header from "./styles/Header";
import Card from "./styles/Card";
import ItemCard from "./styles/ItemCard";
import Page from "./styles/Page";
import ExerciseCard from "./component/ExerciseCard";
import WorkoutForm from "./component/WorkoutForm";
import TopExercises from "./component/TopExercises";
import getNumericTime from "./utils/getNumericTime";
import getAirtableBase from "./utils/getAirtableBase";
import { ReactComponent as AddBlue } from "./assets/Add_Blue.svg";

const TwoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
`;

const ExerciseList = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 1rem;
`;

const BreakCard = styled(ItemCard)`
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
function App() {
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [breakObj, setBreakObj] = useState();

  function onExerciseSelect(exercise) {
    setSelectedExercise(
      selectedExercise.concat({ ...exercise, type: "exercise" })
    );
  }

  //get break obj from database
  useEffect(() => {
    async function getBreakObj() {
      try {
        const base = getAirtableBase();

        const breakData = await base("Exercises").find("recCJqSECk6unSP3D");
        setBreakObj({ ...breakData.fields, id: breakData.id, type: "break" });
      } catch (e) {
        message.error("Error occurred while loading break data");
      }
    }
    getBreakObj();
  }, []);

  //calculate total on change of selected exercises
  useEffect(() => {
    console.log(selectedExercise);
    const total = selectedExercise
      .map((ex) => getNumericTime(ex.Duration))
      .reduce((prev, next) => {
        return prev + next;
      }, 0);
    console.log(total);
    setTotalTime(total);
  }, [selectedExercise]);

  return (
    <Page>
      <Container>
        <Header>
          <strong>Customize</strong> your workout
        </Header>
        <WorkoutForm
          selectedExercise={selectedExercise}
          totalTime={totalTime}
          onSubmitSuccess={() => {
            setSelectedExercise([]);
            setTotalTime(0);
          }}
        ></WorkoutForm>
        <TwoSection>
          <Card>
            <AutoComplete onSelect={onExerciseSelect} />
            <BreakCard style={{ marginBottom: "1.5rem" }}>
              Add Break{" "}
              <div className="add-icon">
                <AddBlue
                  onClick={() =>
                    setSelectedExercise([...selectedExercise, { ...breakObj }])
                  }
                >
                  Add
                </AddBlue>
              </div>
            </BreakCard>

            <TopExercises onExerciseSelect={onExerciseSelect} />
          </Card>

          <ExerciseList>
            {selectedExercise.map((ex, index) => (
              <ExerciseCard exercise={ex} key={index} />
            ))}
          </ExerciseList>
        </TwoSection>
      </Container>
    </Page>
  );
}

export default App;
