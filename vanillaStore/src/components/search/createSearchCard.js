import { El } from "../../utils/el"
import { router } from "../../utils/router"

export function createSearchCard(imgURL, name, price, id) {

  function handleSelect(e) {
    const selectedCardId = e.target.closest(".product-card").id
    router.navigate(`/product/${selectedCardId}`)
  }

  return El({
    element: "div",
    className: "flex flex-col gap-5 justify-start w-full product-card",
    restAttrs: {
      id: id
    },
    eventListener: [
      {
        event: "click",
        callback: (e) => handleSelect(e)
      }
    ],
    children: [
      //image
      El({
        element: "div",
        className: "flex group relative cursor-pointer overflow-hidden",
        children: [
          El({
            element: "img",
            className: "rounded-2xl h-56 flex-1",
            src: imgURL
          }),
          El({
            element: "div",
            className: "hidden group-hover:flex items-center justify-center absolute inset-0 p-3 bg-black/30 text-white text-lg text-center pointer-events-none backdrop-blur-sm ring-2 ring-gray-200 rounded-xl whitespace-normal z-10",
            innerText: name
          }),
          El({
            element: "img",
            className: "w-6 h-6 absolute right-3 top-3",
            src: "/images/heart2.png"
          })
        ]
      }),
      El({
        element: "div",
        className: "flex flex-col gap-3",
        children: [
          // name
          El({
            element: "div",
            className: "relative group cursor-pointer",
            children: [
              El({
                element: "span",
                className: "truncate inline-block w-full text-lg font-bold text-black",
                innerText: name
              }),
              El({
                element: "div",
                className: "hidden absolute group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white text-black text-xs ring-2 ring-gray-200 rounded-xl whitespace-normal z-10 w-fit ",
                innerText: name
              })
            ]
          }),
          // commnets
          El({
            element: "div",
            className: "flex gap-3 items-center",
            children: [
              El({
                element: "div",
                className: "flex items-center gap-2",
                children: [
                  El({
                    element: "img",
                    className: "w-5 h-5",
                    src: "/images/person.png"
                  }),
                  El({
                    element: "div",
                    className: "text-black opacity-70 text-xs",
                    innerText: "4.3"
                  })
                ]
              }),
              El({
                element: "span",
                className: "text-black opacity-70",
                innerText: "|"
              }),
              El({
                element: "div",
                className: "bg-gray-200 rounded-xl px-3 py-2 text-xs text-black",
                innerText: "8.374 sold"
              })
            ]
          }),
          // price
          El({
            element: "div",
            className: "text-black font-semibold text-lg",
            innerText: `$${price}`
          })
        ]
      })
    ]
  })

}