import { El } from "../utils/el"

export const createLine = () => {
  return El({
    element: "hr",
    className: "w-full border-t-2 border-gray-200 my-2"
  })
}