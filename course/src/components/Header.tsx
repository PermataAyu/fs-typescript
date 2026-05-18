import type { HeaderProp } from "../types"

const Header = (props: HeaderProp) => {
  return<h1>{props.courseName}</h1>
}

export default Header