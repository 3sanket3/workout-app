import React, { useState, useEffect } from "react";
import AutoComplete from "./component/AutoComplete";
import { Button } from "antd";
import styled from "styled-components";
import Container from "./styles/Container";
import Header from "./styles/Header";
import Card from "./styles/Card";
import ItemCard from "./styles/ItemCard";
import Page from "./styles/Page";
import ExerciseCard from "./component/ExerciseCard";
import WorkoutForm from "./component/WorkoutForm";
const TwoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
`;

const ExerciseList = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

function App() {
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  function onExerciseSelect(exercise) {
    setSelectedExercise(
      selectedExercise.concat({ ...exercise, type: "exercise" })
    );
  }

  function getNumericTime(duration) {
    return duration ? +duration.replace("m", "") : 0;
  }
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
          <strong>Customize</strong> your workout {totalTime}
        </Header>
        <WorkoutForm
          selectedExercise={selectedExercise}
          totalTime={totalTime}
        ></WorkoutForm>
        <TwoSection>
          <Card>
            <AutoComplete onSelect={onExerciseSelect} />

            <ItemCard>
              Add Break{" "}
              <Button
                onClick={() =>
                  setSelectedExercise([
                    ...selectedExercise,
                    {
                      Name: "Break",
                      Duration: "2m",
                      id: "recoYfKkpzI71lXy1",
                      type: "break",
                    },
                  ])
                }
              >
                Add
              </Button>
            </ItemCard>
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
