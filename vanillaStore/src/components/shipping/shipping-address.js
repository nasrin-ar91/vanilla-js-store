import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { store } from "../../utils/store";
import { modalShipping } from "./modalShipping";


export function ShippingAddress() {

  function addAddressItem(name, address) {
    return El({
      element: "div",
      className: "address-option bg-white rounded-3xl p-5 shadow flex justify-between items-center",
      children: [
        El({
          element: "div",
          className: "flex gap-5 items-center",
          children: [
            El({
              element: "div",
              className: "rounded-full w-12 h-12 bg-black/20 flex items-center justify-center",
              children: [
                El({
                  element: "img",
                  className: "w-8 h-8",
                  src: "/images/location.png"
                })
              ]
            }),
            El({
              element: "div",
              className: "flex flex-col gap-2 items-start",
              children: [
                El({
                  element: "h4",
                  className: "name text-lg font-bold",
                  innerText: name
                }),
                El({
                  element: "p",
                  className: "address text-black/60 text-sm font-semibold",
                  innerText: address
                })
              ]
            })
          ]
        }),
        El({
          element: "div",
          className: "flex",
          children: [
            El({
              element: "input",
              className: "hidden peer",
              restAttrs: {
                type: "radio",
                name: "shipping-address",
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

  function handleApply() {
    const selectedAddress = addressItems.querySelector('input[name="shipping-address"]:checked')?.closest(".address-option");

    if (!selectedAddress) {
      showToast("Please select an address!", "red");
      return
    }

    const shippingAddress = {
      "name": selectedAddress.querySelector(".name").innerText,
      "address": selectedAddress.querySelector(".address").innerText
    }

    localStorage.setItem("chosen_shipping_address", JSON.stringify(shippingAddress));
    router.navigate("/checkout")
  }

  const addressHeader = El({
    element: "div",
    className: "flex gap-4 items-center relative ",
    children: [
      El({
        element: "h2",
        className: "text-xl font-bold text-black pl-12 ",
        innerText: "Shipping Address",
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

  const addressItems = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start mt-2 overflow-y-auto scrollbar-hide",
    children: [
      // home
      El({
        element: "div",
        className: "address-option bg-white rounded-3xl p-5 shadow flex justify-between items-center",
        children: [
          El({
            element: "div",
            className: "flex gap-5 items-center",
            children: [
              El({
                element: "div",
                className: "rounded-full w-12 h-12 bg-black/20 flex items-center justify-center",
                children: [
                  El({
                    element: "img",
                    className: "w-8 h-8",
                    src: "/images/location.png"
                  })
                ]
              }),
              El({
                element: "div",
                className: "flex flex-col gap-2 items-start",
                children: [
                  El({
                    element: "div",
                    className: "flex gap-3 items-center",
                    children: [
                      El({
                        element: "h4",
                        className: "name text-lg font-bold",
                        innerText: "Home"
                      }),
                      El({
                        element: "div",
                        className: "rounded-lg bg-black/10 text-black/80 text-sm px-3 py-1",
                        innerText: "Default"
                      })
                    ]
                  }),
                  El({
                    element: "p",
                    className: "address text-black/60 text-sm font-semibold",
                    innerText: "61480 Sunbrook Park, PC 5679"
                  })
                ]
              })
            ]
          }),
          El({
            element: "div",
            className: "flex",
            children: [
              El({
                element: "input",
                className: "hidden peer",
                restAttrs: {
                  type: "radio",
                  name: "shipping-address",
                  value: "home",
                  id: "home"
                }
              }),
              El({
                element: "label",
                className: "inline-flex justify-center items-center w-6 h-6 border-3 ring-black rounded-full cursor-pointer transition-all duration-300 peer-checked:bg-black",
                restAttrs: {
                  for: "home"
                }
              })
            ]
          })
        ]
      }),
      addAddressItem("Office", "6993 Meadow Valley Terra, PC 3637"),
      addAddressItem("Apartment", "21833 Clyde Gallagher, PC 4642"),
      addAddressItem("Parent's House", "5259 Blue Bill Park, PC 4627"),
    ]
  })

  const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
  savedAddresses.forEach(item => {
    addressItems.append(addAddressItem(item.nameValue, item.addressValue));
  });

  const addBtn = El({
    element: "button",
    className: "w-full rounded-full bg-black/10 p-4 text-lg text-black font-medium cursor-pointer",
    innerText: "Add New Address",
    eventListener: [
      {
        event: "click",
        callback: () => store.setState("addressModal", true)
      }
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

  const addressContainer = El({
    element: "div",
    className: "flex flex-col gap-5 p-5 bg-gray-50/60 w-full h-screen "
  })

  store.subscribe("address", (newvalue) => {
    if (newvalue) {
      addressItems.append(addAddressItem(newvalue.nameValue, newvalue.addressValue));
    }
  })

  addressContainer.append(addressHeader, addressItems, addBtn)

  const shippingPage = El({
    element: "div",
    className: "flex flex-col h-screen w-full bg-gray-50/60 overflow-y-auto scrollbar-hide",
  })

  shippingPage.append(addressContainer, footer, modalShipping())

  return shippingPage
}