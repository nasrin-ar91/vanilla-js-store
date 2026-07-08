import { getCartProducts } from "../../api/cartApi/cartApi";
import { createOrder } from "../../base/createOrder";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { Footer } from "../shared/footer/footer";
import { modalCart } from "./modalCart";


export function Cart() {

  const orderBox = El({
    element: "div",
    className: "flex-1 flex flex-col gap-5 p-5 w-full overflow-y-auto scrollbar-hide"
  })

  const cartHeader = El({
    element: "div",
    className: "flex justify-between items-center px-8 py-5 mt-4",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-5",
        children: [
          El({
            element: "img",
            className: "w-8",
            src: "/images/logo.png"
          }),
          El({
            element: "div",
            className: "text-black text-2xl font-bold",
            innerText: "My Cart"
          })
        ]
      }),
      El({
        element: "img",
        className: "w-7 h-7",
        src: "/images/search.png",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/search")
          }
        ]
      })
    ]
  })

  const footerBox = El({
    element: "div",
    className: "sticky bottom-0 flex flex-col gap-2 p-5 w-full bg-white rounded-t-4xl",
    children: [
      El({
        element: "div",
        className: "flex gap-8 items-center",
        children: [
          El({
            element: "div",
            className: "flex flex-col gap-2",
            children: [
              El({
                element: "div",
                className: "text-black text-sm font-medium opacity-70",
                innerText: "Total Price"
              }),
              El({
                element: "div",
                className: "text-black text-lg font-semibold final-price",
                innerText: ""
              })
            ]
          }),
          El({
            element: "button",
            className: "checkout-btn disabled relative bg-black rounded-full text-white text-lg font-bold p-4 flex-1",
            innerText: "Checkout",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  router.navigate("/checkout");
                }
              }
            ],
            children: [
              El({
                element: "img",
                className: "w-5 h-5 absolute left-2/3 top-1/2 -translate-y-1/2",
                src: "/images/right-arrow.png"
              })
            ]
          })
        ]
      }),
      Footer()
    ]
  })

  const cartContainer = El({
    element: "div",
    className: "flex flex-col overflow-hidden w-full h-screen",
  })

  async function getOrderList() {
    orderBox.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-black"></div >
      <p class="mt-4 text-gray-800 font-bold">Loading ... </p></div>`
    const priceBox = footerBox.querySelector(".final-price")
    const orderData = await getCartProducts();
    orderBox.innerHTML = "";
    const priceArray = [];
    const checkBtn = footerBox.querySelector(".checkout-btn");

    if (orderData.length > 0) {
      checkBtn.disabled = false;
      orderData.map(item => {
        orderBox.append(createOrder(item, getOrderList))
        priceArray.push(item.quantity * item.sneaker.price);
      })
      const totalPrice = priceArray.reduce((sum, current) => sum + current, 0);
      priceBox.innerText = `$ ${totalPrice}`;
    }
    else {
      orderBox.className = "flex-1 flex flex-col gap-5 p-5 pl-10 w-full text-xl font-medium"
      orderBox.innerText = "Your cart is empty. Start shopping now!";
      checkBtn.disabled = true;
    }
  }
  getOrderList()

  cartContainer.append(cartHeader, orderBox, footerBox);

  const page = El({
    element: "div",
    className: "relative h-screen bg-gray-50/90"
  })
  page.append(cartContainer, modalCart(getOrderList));
  return page
}
