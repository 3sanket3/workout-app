import React, { useState } from "react";
import { AutoComplete as AntAutoComplete } from "antd";
import debounce from "lodash/debounce";
import { Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import getAirtableBase from "../utils/getAirtableBase";
import { useExerciseContext } from "../context/ExerciseContext";
const { Option } = AntAutoComplete;
function AutoComplete() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { addExercise } = useExerciseContext();
  const search = debounce(async (text) => {
    if (text && text.length >= 3) {
      setLoading(true);
      const base = getAirtableBase();
      try {
        const records = await base("Exercises")
          .select({
            view: "Grid view",
            filterByFormula: `SEARCH("${text.toLowerCase()}", LOWER({Name}))`,
          })
          .firstPage();

        setExercises(
          records
            .map((record) => ({
              ...record.fields,
              id: record.id,
            }))
            .filter((record) => record.Name !== "Break")
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }, 500);

  function onValueSelect(value) {
    const exercise = exercises.find((ex) => ex.id === value);
    if (exercise) {
      addExercise && addExercise(exercise);
    }
    form.resetFields();
    setExercises([]);
  }
  const options = exercises.map((exercise) => (
    <Option key={exercise.id} value={exercise.id}>
      {exercise.Name}
    </Option>
  ));

  return (
    <Form form={form} initialValues={{ exercises: "" }}>
      <Form.Item name="exercise">
        <AntAutoComplete
          onSearch={search}
          onSelect={onValueSelect}
          placeholder="Search"
          suffixIcon={loading ? <LoadingOutlined /> : null}
        >
          {options}
        </AntAutoComplete>{" "}
      </Form.Item>
    </Form>
  );
}

export default AutoComplete;
