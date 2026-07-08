import debounce from "lodash.debounce";
import { El } from "../../utils/el";
import { router } from "../../utils/router";


export function SearchItem() {

  const searchBox = El({
    element: "div",
    className: "w-full relative inset-x-0",
    children: [
      El({
        element: "input",
        className: "w-full p-2 pl-12 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:border-transparent focus:ring-black transition-ring duration-300",
        restAttrs: {
          placeholder: "Search"
        }
      }),
      El({
        element: "img",
        className: "w-6 h-6 absolute top-1/2 -translate-y-1/2 left-3",
        src: "/images/search.png"
      })
    ],
    eventListener: [
      {
        event: "input",
        callback: debounce((e) => {
          const query = e.target.value.trim();
          localStorage.setItem("searchQuery", query);
          router.navigate("/search")
        }, 600)
      }
    ]
  })
  return searchBox
}