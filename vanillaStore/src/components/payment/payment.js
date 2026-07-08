import { deleteCart, getCartProducts } from "../../api/cartApi/cartApi";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { store } from "../../utils/store";
import { PaymentModal } from "./modalPayment";


export function Payment() {

  async function deleteOrder() {
    const purchasedOrderList = await getCartProducts();
    await Promise.all(
      purchasedOrderList.map(async (item) => {
        await deleteCart(item.id);
      })
    );
  }

  function handleConfirm() {
    const selectedPayment = paymentItems.querySelector('input[name="payment"]:checked')
    if (selectedPayment) {
      deleteOrder();
      localStorage.clear();

      store.setState("paymentModal", true);
    } else {
      showToast("Please select a payment method!", "red")
    }
  }

  function createOption(name, src, price) {
    let priceClass = "flex"
    if (!price) {
      priceClass = "hidden"
    }
    return El({
      element: "div",
      className: "type-option bg-white rounded-3xl py-5 px-7 shadow flex justify-between items-center",
      children: [
        El({
          element: "div",
          className: "flex items-center gap-3",
          children: [
            El({
              element: "img",
              className: "w-12 h-12 img-src",
              src: src
            }),
            El({
              element: "h4",
              className: "name text-lg font-bold",
              innerText: name
            })
          ]
        }),
        El({
          element: "div",
          className: "flex gap-3 items-center",
          children: [
            El({
              element: "div",
              className: `${priceClass} price text-back/70 text-xl font-bold`,
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
                    name: "payment",
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
      ]
    })
  }

  const paymentHeader = El({
    element: "div",
    className: "flex gap-4 items-center relative ",
    children: [
      El({
        element: "h2",
        className: "text-xl font-bold text-black pl-12 ",
        innerText: "Payment Methods",
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
      }),
      El({
        element: "img",
        className: "w-8 h-8 absolute right-0 top-0",
        src: "/images/add-square.png",
      })

    ]
  })

  const paymentItems = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start mt-2 overflow-y-auto scrollbar-hide",
    children: [
      createOption("My Wallet", "/images/economy.png", 9.379),
      createOption("PayPal", "/images/regular.png", 0),
      createOption("Google Pay", "/images/cargo.png", 0),
      createOption("Apple Pay", "/images/express.png", 0),
      createOption(".... .... .... .... 4679", "/images/express.png", 0)
    ]
  })

  const footer = El({
    element: "div",
    className: "sticky bottom-0 w-full px-5 py-8 shadow rounded-t-3xl bg-white flex items-center justify-center",
    children: [
      El({
        element: "button",
        className: "bg-black text-white font-bold text-lg relative cursor-pointer rounded-full p-4 w-full",
        innerText: "Confirm Payment",
        eventListener: [
          {
            event: "click",
            callback: handleConfirm
          }
        ]
      })
    ]
  })

  const paymentContainer = El({
    element: "div",
    className: "flex flex-col gap-5 p-5 bg-gray-50/60 w-full h-screen "
  })

  paymentContainer.append(paymentHeader, paymentItems)

  const paymentPage = El({
    element: "div",
    className: "flex flex-col h-screen w-full bg-gray-50/60",
  })

  paymentPage.append(paymentContainer, footer, PaymentModal())

  return paymentPage
}