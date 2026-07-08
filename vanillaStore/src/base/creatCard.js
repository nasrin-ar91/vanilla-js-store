import { El } from "../utils/el"
import { router } from "../utils/router"


export function createCard(imgUrl, productName, price, id) {
  const card = El({
    element: "div",
    className: "flex flex-col gap-5 w-full product-card",
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
        element: "img",
        className: "rounded-2xl h-56",
        src: imgUrl
      }),
      El({
        element: "div",
        className: "flex flex-col gap-1",
        children: [
          El({
            element: "div",
            className: "text-lg font-bold text-black group relative cursor-pointer",
            children: [
              El({
                element: "span",
                className: "truncate inline-block w-full",
                innerText: productName
              }),
              El({
                element: "div",
                className: "hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-white text-black text-xs ring-2 ring-gray-200 rounded-xl whitespace-normal z-10 w-fit",
                innerText: productName
              })
            ]

          }),
          // price
          El({
            element: "div",
            className: "text-black font-semibold",
            innerText: `$${price}`
          })
        ]
      })
    ]
  })

  function handleSelect(e) {
    const selectedCardId = e.target.closest(".product-card").id
    router.navigate(`/product/${selectedCardId}`)
  }

  return card
}

