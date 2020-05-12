import React, { useState, useEffect } from "react";
import AutoComplete from "./component/AutoComplete";
import { message } from "antd";
import styled from "styled-components";
import Container from "./styles/Container";
import Header from "./styles/Header";
import Card from "./styles/Card";
import Page from "./styles/Page";
import WorkoutForm from "./component/WorkoutForm";
import TopExercises from "./component/TopExercises";
import getNumericTime from "./utils/getNumericTime";
import getAirtableBase from "./utils/getAirtableBase";
import ExerciseList from "./component/ExerciseList";
import { ExerciseContextProvider } from "./context/ExerciseContext";
import BreakCard from "./component/BreakCard";
const TwoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
`;

function App() {
  const [breakObj, setBreakObj] = useState();

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

  return (
    <ExerciseContextProvider>
      <Page>
        <Container>
          <Header>
            <strong>Customize</strong> your workout
          </Header>
          <WorkoutForm></WorkoutForm>
          <TwoSection>
            <Card>
              <AutoComplete />
              <BreakCard breakObj={breakObj}></BreakCard>
              <TopExercises />
            </Card>
            <ExerciseList></ExerciseList>
          </TwoSection>
        </Container>
      </Page>
    </ExerciseContextProvider>
  );
}

export default App;
