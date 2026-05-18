import type { ContentProps } from "../types"

const Content = ({courseParts}: ContentProps) => {
  return (
    <>
    {courseParts.map((p) => {
      switch (p.kind) {
        case "basic":
          return(
            <p key={p.name}>
              <b>{p.name} {p.exerciseCount}</b>
              <br/>
              <i>{p.description}</i>
            </p>
          )
        case "background": 
          return (
            <p key={p.name}>
              <b>{p.name} {p.exerciseCount}</b>
              <br />
              <i>{p.description}</i>
              <br />
              <>submit to {p.backgroundMaterial}</>
            </p>
          )
        case "group":
          return(
            <p key={p.name}>
              <b>{p.name} {p.exerciseCount}</b>
              <br />
              <>project exercises {p.groupProjectCount}</>
            </p>
          )
        case "special":
          return(
            <p key={p.name}>
              <b>{p.name} {p.exerciseCount}</b>
              <br />
              <i>{p.description}</i>
              <br />
              <>required skill: {p.requirements.toString()}</>
            </p>
          )
        default:
          break;
      }
    })}
    </>
  )
}

export default Content