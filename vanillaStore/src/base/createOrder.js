import debounce from "lodash.debounce";
import { store } from "../utils/store";
import { updateProducts } from "../api/cartApi/cartApi";
import { showToast } from "./showToast";
import { El } from "../utils/el";


export function createOrder(item, getOrderList) {
  let selectedQuantity = item.quantity;

  function handleRemove(item) {
    store.setState("selectedOrder", item)
    store.setState("isModal", true)
  }

  function updateProductUI() {
    const QuantityOrder = order.querySelector(`.order-quantity-${item.sneaker.id}`);
    const upBtn = order.querySelector(`.up-btn-${item.sneaker.id}`);
    const downBtn = order.querySelector(`.down-btn-${item.sneaker.id}`);

    QuantityOrder.innerText = selectedQuantity;
    downBtn.disabled = selectedQuantity === 1;
    upBtn.disabled = selectedQuantity === item.sneaker.pid;
  }

  const updateServer = debounce(async (id, qty) => {
    try {

      await updateProducts(id, qty);
      getOrderList();
      showToast("Product updated successfully.", "green");
    }
    catch (error) {
      console.error(error);
    }
  }, 800)

  function handleDecrement(item) {

    if (selectedQuantity > 1) {

      selectedQuantity--;
      updateProductUI();
      updateServer(item.id, selectedQuantity);
    }
  }

  function handleIncrement(item) {

    if (selectedQuantity < item.sneaker.pid) {
      selectedQuantity++;
      updateProductUI();
      updateServer(item.id, selectedQuantity);
    }
    else {
      showToast("Not enough stock!", "red");
    }
  }

  const order = El({
    element: "div",
    className: "bg-white w-full rounded-3xl shadow border-none p-5 flex gap-5 items-center relative order-product",
    children: [
      El({
        element: "img",
        className: "w-30 h-30 rounded-3xl",
        src: item.sneaker.imageURL
      }),
      El({
        element: "div",
        className: "flex flex-col gap-3 justify-start flex-1 min-w-0",
        children: [
          // name
          El({
            element: "div",
            className: "relative group flex pr-5",
            children: [
              El({
                element: "span",
                className: "truncate text-lg font-bold text-black",
                innerText: item.sneaker.name
              }),
              El({
                element: "div",
                className: "hidden absolute group-hover:block left-1/2 -translate-x-1/2 top-full mt-2 py-3 px-5 ring-2 ring-gray-200 rounded-full shadow-lg text-black text-sm w-fit !z-10 whitespace-normal",
                innerText: item.sneaker.name
              })
            ]
          }),
          // size & color
          El({
            element: "div",
            className: "flex items-center gap-2",
            children: [
              El({
                element: "div",
                className: `bg-black rounded-full w-4 h-4 border-gray-200 shadow-lg`
              }),
              El({
                element: "div",
                className: "text-black text-sm opacity-70",
                innerText: "black"
              }),
              El({
                element: "div",
                className: "text-black",
                innerText: "|"
              }),
              El({
                element: "div",
                className: "text-black text-sm opacity-70",
                innerText: `Size = 40 `
              })
            ]
          }),
          // price & quantity
          El({
            element: "div",
            className: "flex items-center justify-between",
            children: [
              El({
                element: "div",
                className: "text-lg font-bold text-black",
                innerText: `$ ${item.sneaker.price}.00`
              }),
              El({
                element: "div",
                className: "bg-gray-100 rounded-full px-2 flex gap-2 items-center",
                children: [
                  El({
                    element: "button",
                    className: `btn down-btn-${item.sneaker.id} flex items-center justify-center text-2xl font-bold px-3 py-1 disabled:opacity-60 disabled:cursor-not-allowed`,
                    innerText: "-",
                    eventListener: [
                      {
                        event: "click",
                        callback: () => handleDecrement(item)
                      }
                    ]
                  }),
                  El({
                    element: "span",
                    className: `order-quantity-${item.sneaker.id} flex items-center justify-center text-lg text-center font-bold px-3 py-1`,
                    innerText: item.quantity
                  }),
                  El({
                    element: "button",
                    className: `btn up-btn-${item.sneaker.id} flex items-center justify-center text-2xl font-bold px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed`,
                    innerText: "+",
                    eventListener: [
                      {
                        event: "click",
                        callback: () => handleIncrement(item)
                      }
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),
      El({
        element: "img",
        className: "w-5 h-5 absolute right-5 top-6 cursor-pointer delete-option",
        src: "/images/delete.png",
        eventListener: [
          {
            event: "click",
            callback: () => handleRemove(item)
          }
        ]
      })
    ]
  })

  updateProductUI();

  return order
}