export default function getNumericTime(duration) {
  return duration ? +duration.replace("m", "") : 0;
}
