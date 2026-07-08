import { deleteCart } from "../../api/cartApi/cartApi";
import { createLine } from "../../base/createLine";
import { El } from "../../utils/el";
import { store } from "../../utils/store";


export function modalCart(inputFunc) {
  const backdrop = El({
    element: "div",
    className: "flex hidden bg-gray-600/90  fixed inset-0 items-end justify-center z-40",
    eventListener: [
      {
        event: "click",
        callback: (e) => {
          if (e.target === backdrop) {
            store.setState("isModal", false);
          }
        }
      }
    ]
  })

  async function handleDelete() {
    const productOrderedId = store.getState("selectedOrder");
    const removeProduct = await deleteCart(Number(productOrderedId.id))
    store.setState("isModal", false)
  }

  const orderBox = El({
    element: "div",
    className: "flex flex-col w-full"
  })

  const modalContent = El({
    element: "div",
    className: "bg-white rounded-t-4xl shadow-xl px-5 py-10 relative flex flex-col items-center justify-center gap-5 w-full ",
    children: [
      El({
        element: "div",
        className: "text-lg text-black font-bold",
        innerText: "Remove From Cart?"
      }),
      createLine(),
      orderBox,
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
                  store.setState("isModal", false)
                }
              }
            ]
          }),
          El({
            element: "button",
            innerText: "Yes, Remove",
            className: "bg-black rounded-full py-4 w-1/2 text-white text-sm font-bold hover:cursor-pointer hover:-translate-y-1",
            eventListener: [
              {
                event: "click",
                callback: handleDelete
              }
            ]
          })
        ]
      })
    ]

  })

  store.subscribe("selectedOrder", (value) => {
    const newItem = value ?? {};
    if (newItem) {
      orderBox.innerHTML = "";
      orderBox.append(createOrder(newItem));
      const btns = orderBox.querySelectorAll(".btn");
      const deleteBtn = orderBox.querySelector(".delete-option");
      btns.disabled = true;
      deleteBtn.classList.add("hidden");
    }
  })

  backdrop.append(modalContent);

  store.subscribe("isModal", (modalValue) => {
    const modalFlag = modalValue ?? false;
    if (modalFlag) {
      backdrop.classList.remove("hidden");
      backdrop.classList.add("flex");
    } else {
      backdrop.classList.remove("flex")
      backdrop.classList.add("hidden");
      inputFunc();
    }
  })

  return backdrop
}