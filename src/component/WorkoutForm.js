import React from "react";
import { Form, Button, Input, message } from "antd";
import styled from "styled-components";

import getAirtableBase from "../utils/getAirtableBase";

const StyledForm = styled(Form)`
  display: flex;
  justify-content: space-between;
`;

function WorkoutForm({ selectedExercise, totalTime, onSubmitSuccess }) {
  const [form] = Form.useForm();
  async function onSubmit(values) {
    if (selectedExercise.length) {
      const workoutObj = {
        Name: values.workoutName.trim(),
        "Link to Exercises": selectedExercise
          .map((ex) => ex.id)
          .filter((value, index, array) => array.indexOf(value) === index),
        Duration: totalTime,
        Exercises: selectedExercise.map((ex, index) =>
          `${index + 1} - ${ex.Name}`.trim()
        ),
      };
      console.log({ workoutObj });
      const base = getAirtableBase();
      try {
        await base("Workout").create([
          {
            fields: workoutObj,
          },
        ]);
        form.resetFields();
        onSubmitSuccess && onSubmitSuccess();
        message.success("Workout saved successfully");
      } catch (e) {
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
