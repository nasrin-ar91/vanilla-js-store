import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";



export function ShippingTypeAddress() {

  function handleApply() {
    const selectedType = shippingTypeItems.querySelector('input[name="shipping-type"]:checked')?.closest(".type-option");

    if (!selectedType) {
      showToast("Please select a shipping type!", "red");
      return
    }

    const shippingType = {
      "name": selectedType.querySelector(".name").innerText,
      "price": selectedType.querySelector(".price").innerText.split(" ")[1],
      "src": selectedType.querySelector(".img-src").src,
      "detail": selectedType.querySelector(".arrival-p").innerText
    }

    localStorage.setItem("chosen_shipping_type", JSON.stringify(shippingType));
    router.navigate("/checkout")
  }

  function createOption(name, src, p, price) {
    return El({
      element: "div",
      className: "type-option bg-white rounded-3xl py-5 px-7 shadow flex justify-between items-center",
      children: [
        El({
          element: "div",
          className: "rounded-full w-12 h-12 bg-black flex items-center justify-center",
          children: [
            El({
              element: "img",
              className: "w-10 h-10 img-src",
              src: src
            })
          ]
        }),
        El({
          element: "div",
          className: "flex flex-col gap-2 items-start",
          children: [
            El({
              element: "h4",
              className: "name text-xl font-bold",
              innerText: name
            }),
            El({
              element: "p",
              className: "arrival-p text-black/60 text-sm font-bold",
              innerText: p
            })
          ]
        }),
        El({
          element: "div",
          className: "price text-back text-xl font-bold",
          innerText: `$ ${price}`
        })
        ,
        El({
          element: "div",
          className: "flex",
          children: [
            El({
              element: "input",
              className: "hidden peer",
              restAttrs: {
                type: "radio",
                name: "shipping-type",
                value: name,
                id: name
              }
            }),
            El({
              element: "label",
              className: "inline-flex justify-center items-center w-6 h-6 border-3 ring-black rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-black",
              restAttrs: {
                for: name
              }
            })
          ]
        })
      ]
    })
  }

  const shippingHeader = El({
    element: "div",
    className: "flex gap-4 items-center relative ",
    children: [
      El({
        element: "h2",
        className: "text-xl font-bold text-black pl-12 ",
        innerText: "Choose Shipping",
      }),
      El({
        element: "img",
        className: "w-8 h-8 absolute left-0 top-0 cursor-pointer",
        src: "/images/arrow-left.png",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/checkout")
          }
        ]
      })

    ]
  })

  const shippingTypeItems = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start mt-2 overflow-y-auto scrollbar-hide",
    children: [
      createOption("Economy", "/images/economy.png", "Estimated Arrival, Dec 20-23", 10),
      createOption("Regular", "/images/regular.png", "Estimated Arrival, Dec 20-22", 15),
      createOption("Cargo", "/images/cargo.png", "Estimated Arrival, Dec 19-20", 20),
      createOption("Express", "/images/express.png", "Estimated Arrival, Dec 18-19", 30)
    ]
  })

  const footer = El({
    element: "div",
    className: "sticky bottom-0 w-full px-5 py-8 shadow rounded-t-3xl bg-white flex items-center justify-center",
    children: [
      El({
        element: "button",
        className: "bg-black text-white font-bold text-lg relative cursor-pointer rounded-full p-4 w-full",
        innerText: "Apply",
        eventListener: [
          {
            event: "click",
            callback: handleApply
          }
        ]
      })
    ]
  })

  const shippingTypeContainer = El({
    element: "div",
    className: "flex flex-col gap-5 p-5 bg-gray-50/60 w-full h-screen "
  })

  shippingTypeContainer.append(shippingHeader, shippingTypeItems)

  const shippingTypePage = El({
    element: "div",
    className: "flex flex-col h-screen w-full bg-gray-50/60",
  })

  shippingTypePage.append(shippingTypeContainer, footer)

  return shippingTypePage
}