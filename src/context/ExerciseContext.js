import React, { createContext, useState, useContext, useEffect } from "react";
import getNumericTime from "../utils/getNumericTime";
const ExerciseContext = createContext({
  exercises: [],
  totalTime: 0,
  addExercise: undefined,
  replaceExercises: undefined,
});

function ExerciseContextProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  //calculate total on change of selected exercises
  useEffect(() => {
    const total = exercises
      .map((ex) => getNumericTime(ex.Duration))
      .reduce((prev, next) => {
        return prev + next;
      }, 0);
    setTotalTime(total);
  }, [exercises]);

  function addExercise(exercise, type = "exercise") {
    setExercises(
      exercises.concat({
        ...exercise,
        type: type,
        key: new Date().getTime().toString(),
      })
    );
  }
  function replaceExercises(exercises = []) {
    setExercises([...exercises]);
  }
  return (
    <ExerciseContext.Provider
      value={{ exercises, totalTime, addExercise, replaceExercises }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

function useExerciseContext() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      `useExerciseContext is being access outside of ExerciseProvicer`
    );
  }
  return context;
}

export { ExerciseContextProvider, useExerciseContext };
