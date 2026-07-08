import { El } from "../../utils/el"
import { Footer } from "../shared/footer/footer"
import { Header } from "./header"
import { Products } from "./products"
import { SearchItem } from "./searchBox"


export function Home() {

  const homeContainer = El({
    element: "div",
    className: "flex flex-col gap-6 p-5 w-screen h-screen flex-1 overflow-hidden",
  })

  homeContainer.append(Header(), SearchItem(), Products(), Footer())

  return homeContainer
}