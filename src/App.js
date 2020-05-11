import React, { useEffect, useState, useCallback } from "react";
import Airtable from "airtable";
import { AutoComplete } from "antd";
import debounce from "lodash/debounce";
import { Form, Input } from "antd";
import styled from "styled-components";

const { Option } = AutoComplete;

const Container = styled.div`
  max-width: 600px;

  margin: 0 auto;
`;
function App() {
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
          records.map((record) => ({
            ...record.fields,
            id: record.id,
          }))
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }, 500);

  function onSelect(value) {
    console.log(value);
  }
  const options = exercises.map((exercise) => (
    <Option key={exercise.id} value={exercise.id}>
      {exercise.Name}
    </Option>
  ));
  return (
    <Container>
      <Form>
        <Form.Item>
          <AutoComplete
            onSearch={search}
            onSelect={onSelect}
            allowClear={true}
            autoFocus={true}
          >
            {options}
          </AutoComplete>{" "}
        </Form.Item>
        {loading && "loading..."}
      </Form>
    </Container>
  );
}

export default App;
