import Airtable from "airtable";

export default function getAirtableBase() {
  return new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
  }).base("appAvb9Has83IwrXz");
}
