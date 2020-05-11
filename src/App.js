import React, { useState } from "react";
import AutoComplete from "./component/AutoComplete";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import Container from "./styles/Container";
import Header from "./styles/Header";
import Card from "./styles/Card";
import ItemCard from "./styles/ItemCard";
import Page from "./styles/Page";
import ExerciseCard from "./component/ExerciseCard";
import { useEffect } from "react";

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

const WorkoutForm = styled(Form)`
  display: flex;
  justify-content: space-between;
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
        <WorkoutForm>
          <Form.Item>
            <Input placeholder="Workout Name" />
          </Form.Item>

          <div>
            <span>Total Time:</span> <strong>{`${totalTime} m`}</strong>
            <Button> Save</Button>
          </div>
        </WorkoutForm>
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
