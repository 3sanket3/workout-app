import React from "react";
import { Form, Button, Input, message } from "antd";
import styled from "styled-components";

import getAirtableBase from "../utils/getAirtableBase";
import { useExerciseContext } from "../context/ExerciseContext";

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
`;

function WorkoutForm() {
  const { exercises, totalTime, replaceExercises } = useExerciseContext();
  const [form] = Form.useForm();
  async function onSubmit(values) {
    if (exercises.length) {
      const workoutObj = {
        Name: values.workoutName.trim(),
        "Link to Exercises": exercises
          .map((ex) => ex.id)
          .filter((value, index, array) => array.indexOf(value) === index),
        Duration: totalTime,
        Exercises: exercises.map((ex, index) =>
          `${index + 1} - ${ex.Name}`.trim()
        ),
      };
      const base = getAirtableBase();
      try {
        await base("Workout").create([
          {
            fields: workoutObj,
          },
        ]);
        form.resetFields();
        replaceExercises && replaceExercises();
        message.success("Workout saved successfully");
      } catch (e) {
        console.log(e);
        message.error(`Unable to save the workout`);
      }
    } else {
      message.error("Please select at least one exercise");
    }
  }

  return (
    <StyledForm
      form={form}
      onFinish={onSubmit}
      initialValues={{ workoutName: "" }}
    >
      <Form.Item
        name="workoutName"
        rules={[{ required: true, message: "Please input workout name" }]}
      >
        <Input placeholder="Workout Name" />
      </Form.Item>

      <div>
        <span>Total Time:</span> <strong>{`${totalTime} m`}</strong>
        <Button htmlType="submit" style={{ margin: "0 1rem" }}>
          {" "}
          Save
        </Button>
      </div>
    </StyledForm>
  );
}
export default WorkoutForm;
