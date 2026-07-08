import { El } from "../../utils/el";
import { store } from "../../utils/store";


export function PaymentModal() {
  const backdrop = El({
    element: "div",
    className: "flex hidden bg-gray-600/90 p-10  fixed inset-0 items-center justify-center z-40",
    eventListener: [
      {
        event: "click",
        callback: (e) => {
          if (e.target === backdrop) {
            store.setState("paymentModal", false);
          }
        }
      }
    ]
  })

  const modalContent = El({
    element: "div",
    className: "bg-white rounded-4xl shadow-xl px-5 py-10 flex flex-col items-center justify-center gap-5 w-full ",
    children: [
      El({
        element: "img",
        className: "w-40 h-40",
        src: "/images/checklist.png"
      }),
      El({
        element: "div",
        className: "text-xl text-black font-bold",
        innerText: "Order Successful!"
      }),
      El({
        element: "p",
        className: "text-black text-lg font-semibold",
        innerText: "You have successfully made order "
      }),
      El({
        element: "button",
        innerText: "View Order",
        className: "bg-black rounded-full w-full p-4 text-white text-lg font-bold hover:cursor-pointer",
        eventListener: [
          {
            event: "click",
            callback: () => store.setState("paymentModal", false)
          }
        ]
      }),
      El({
        element: "button",
        innerText: "View E-Receipt",
        className: "bg-black/10 rounded-full w-full p-4 text-black text-lg font-bold hover:cursor-pointer",
        eventListener: [
          {
            event: "click",
            callback: () => store.setState("paymentModal", false)
          }
        ]
      }),
    ]
  })

  backdrop.append(modalContent);

  store.subscribe("paymentModal", (modalValue) => {
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