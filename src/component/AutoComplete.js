import React, { useState } from "react";
import Airtable from "airtable";
import { AutoComplete as AntAutoComplete } from "antd";
import debounce from "lodash/debounce";
import { Form } from "antd";
import { useRef } from "react";
const { Option } = AntAutoComplete;
function AutoComplete({ onSelect }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = debounce(async (text) => {
    if (text && text.length >= 3) {
      setLoading(true);
      const base = new Airtable({
        apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
      }).base("appmK01nXHKGmZzsX");
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
      onSelect && onSelect(exercise);
    }
  }
  const options = exercises.map((exercise) => (
    <Option key={exercise.id} value={exercise.id}>
      {exercise.Name}
    </Option>
  ));

  return (
    <Form>
      <Form.Item>
        <AntAutoComplete
          onSearch={search}
          onSelect={onValueSelect}
          placeholder="Search"
        >
          {options}
        </AntAutoComplete>{" "}
      </Form.Item>
    </Form>
  );
}

export default AutoComplete;
