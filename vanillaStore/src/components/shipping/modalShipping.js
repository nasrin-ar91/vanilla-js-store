import { createLine } from "../../base/createLine";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { store } from "../../utils/store";


export function modalShipping() {
  const backdrop = El({
    element: "div",
    className: "flex hidden bg-gray-600/90  fixed inset-0 items-end justify-center z-40",
    eventListener: [
      {
        event: "click",
        callback: (e) => {
          if (e.target === backdrop) {
            store.setState("addressModal", false);
          }
        }
      }
    ]
  })

  function handleAdd() {
    const nameValue = inputBox.querySelector("#addressName").value.trim()
    const addressValue = inputBox.querySelector("#address").value.trim()
    if (!nameValue && !addressValue) showToast("Inputs can not be empty!", "red")
    else {
      const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
      savedAddresses.push({ nameValue, addressValue });
      localStorage.setItem("addresses", JSON.stringify(savedAddresses));

      store.setState("address", { nameValue, addressValue });
      showToast("Address added successfully!", "green");
      store.setState("addressModal", false);
    }
  }

  const inputBox = El({
    element: "div",
    className: "flex flex-col gap-3 w-full",
    children: [
      El({
        element: "input",
        classList: "rounded-xl bg-black/5 text-black p-4 w-full",
        restAttrs: {
          placeholder: "Please Enter Address Name",
          name: "addressName",
          id: "addressName"
        }
      }),
      El({
        element: "input",
        classList: "rounded-xl bg-black/5 text-black p-4 w-full",
        restAttrs: {
          placeholder: "Please Enter Address ",
          name: "address",
          id: "address"
        }
      })
    ]
  })

  const modalContent = El({
    element: "div",
    className: "bg-white rounded-t-4xl shadow-xl px-5 py-10 relative flex flex-col items-center justify-center gap-5 w-full ",
    children: [
      El({
        element: "div",
        className: "text-lg text-black font-bold",
        innerText: "Add New Address"
      }),
      createLine(),
      inputBox,
      createLine(),
      El({
        element: "div",
        className: "flex items-center w-full gap-2",
        children: [
          El({
            element: "button",
            innerText: "Cancel",
            className: "bg-gray-200 rounded-full py-4 w-1/2 text-sm font-bold hover:cursor-pointer hover:-translate-y-1",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  store.setState("addressModal", false)
                }
              }
            ]
          }),
          El({
            element: "button",
            innerText: "Add",
            className: "bg-black rounded-full py-4 w-1/2 text-white text-sm font-bold hover:cursor-pointer hover:-translate-y-1",
            eventListener: [
              {
                event: "click",
                callback: handleAdd
              }
            ]
          })
        ]
      })
    ]

  })

  backdrop.append(modalContent);

  store.subscribe("addressModal", (modalValue) => {
    const modalFlag = modalValue ?? false;
    if (modalFlag) {
      backdrop.classList.remove("hidden");
      backdrop.classList.add("flex");
    } else {
      backdrop.classList.remove("flex")
      backdrop.classList.add("hidden");
    }
  })

  return backdrop
}