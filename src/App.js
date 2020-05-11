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
import getNumericTime from "./utils/getNumericTime";
import Airtable from "airtable";

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
        const base = new Airtable({
          apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
        }).base("appmK01nXHKGmZzsX");

        const breakData = await base("Exercises").find("recoYfKkpzI71lXy1");
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
                  setSelectedExercise([...selectedExercise, { ...breakObj }])
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
