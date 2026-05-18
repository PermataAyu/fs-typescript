import type { TotalProp } from "../types";

const Total = (props: TotalProp) => {
  return <p>Number of exercises {props.totalExercise}</p>
}

export default Total