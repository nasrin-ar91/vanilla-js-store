import { getCartProducts } from "../../api/cartApi/cartApi";
import { createLine } from "../../base/createLine";
import { createOrder } from "../../base/createOrder";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { store } from "../../utils/store";


export function CheckOut() {

  const selectedAddress = JSON.parse(localStorage.getItem("chosen_shipping_address")) ?? {
    "name": "Home", "address": "61480 Sunbrook Park, PC 5679"
  };

  const address = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start mt-5 text-lg font-bold",
    innerText: "Shipping Address",
    children: [
      El({
        element: "div",
        className: "bg-white rounded-3xl p-5 shadow flex justify-between items-center",
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
                    className: "text-lg font-bold",
                    innerText: selectedAddress.name
                  }),
                  El({
                    element: "p",
                    className: "text-black/60 text-sm font-semibold",
                    innerText: selectedAddress.address
                  })
                ]
              })
            ]
          }),
          El({
            element: "img",
            className: "w-7 h-7 cursor-pointer",
            src: "/images/edit.png",
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate("/shipping-address")
              }
            ]
          })
        ]
      })
    ]
  })

  const orderListChild = El({
    element: "div",
    className: "flex flex-col gap-5"
  })
  const orderList = El({
    element: "div",
    className: "flex flex-col gap-5 text-lg font-bold overflow-y-auto scrollbar-hide ",
    innerText: "Order List",
    children: [
      orderListChild
    ]
  })

  const shippingItem = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start"
  })

  const shipping = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start",
    children: [
      El({
        element: "div",
        className: "text-lg font-bold",
        innerText: "Choose Shipping"
      }),
      shippingItem
    ]
  })

  const inputBox = El({
    element: "div",
    className: "flex-1 flex justify-start items-center",
    children: [
      El({
        element: "input",
        className: "w-full discount-input bg-black/5 rounded-3xl pl-5 py-4 shadow flex justify-start items-center font-semibold text-sm text-black/50 focus:ring-2 focus:ring-black transition-ring duration-300",
        restAttrs: {
          placeholder: "Enter Promo Code"
        }
      })
    ]
  })

  const code = El({
    element: "div",
    className: "flex flex-col gap-5 justify-start text-lg font-bold",
    innerText: "Promo Code",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-6",
        children: [
          inputBox,
          El({
            element: "img",
            className: "w-12 h-12 cursor-pointer",
            src: "/images/add.png",
            eventListener: [
              {
                event: "click",
                callback: handleDiscount
              }
            ]
          })
        ]
      }),
      El({
        element: "div",
        className: "discount-code border border-black/20 p-3 ml-2 w-fit rounded-3xl text-sm flex items-center justify-start hover:cursor-pointer",
        innerText: "Use 30% Discount",
        eventListener: [{
          event: "click",
          callback: (e) => {
            const isApplied = e.target.classList.toggle("bg-green-50");
            const inputBoxValue = inputBox.querySelector(".discount-input");
            if (isApplied) inputBoxValue.value = "Discount30";
            else inputBoxValue.value = "";
          }
        }]
      })
    ]
  })

  const price = El({
    element: "div",
    className: "flex flex-col items-start gap-4 p-5 mt-2 bg-white rounded-3xl shadow",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-between w-full",
        children: [
          El({
            element: "div",
            className: "text-black/50 font-semibold text-sm",
            innerText: "Amount"
          }),
          El({
            element: "div",
            className: "amount text-black text-lg font-semibold",
          })
        ]
      }),
      El({
        element: "div",
        className: "flex items-center justify-between w-full mt-2",
        children: [
          El({
            element: "div",
            className: "text-black/50 font-semibold text-sm",
            innerText: "Shipping"
          }),
          El({
            element: "div",
            className: "text-black text-lg font-semibold shipping-cost"
          })
        ]
      }),
      El({
        element: "div",
        className: "promo-box hidden flex items-center justify-between w-full mt-2",
        children: [
          El({
            element: "div",
            className: "text-black/50 font-semibold text-sm",
            innerText: "Promo"
          }),
          El({
            element: "div",
            className: "text-black text-lg font-semibold promo-discount"
          })
        ]
      }),
      createLine(),
      El({
        element: "div",
        className: "flex items-center justify-between w-full",
        children: [
          El({
            element: "div",
            className: "text-black/50 font-semibold text-sm",
            innerText: "Total"
          }),
          El({
            element: "div",
            className: "total-price text-black text-lg font-bold",
          })
        ]
      })
    ]
  })

  const footer = El({
    element: "div",
    className: "sticky bottom-0 w-full px-5 py-8 shadow rounded-t-3xl bg-white flex items-center justify-center",
    children: [
      El({
        element: "button",
        className: "continueBtn bg-black text-white font-bold text-lg relative cursor-pointer rounded-full p-4 w-full disabled:bg-black/40",
        innerText: "Continue to Payment",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/payment")
          }
        ],
        children: [
          El({
            element: "img",
            className: "absolute w-5 h-5 right-1/5 top-1/2 -translate-y-1/2",
            src: "/images/right-arrow.png"
          })
        ]
      })
    ]
  })

  function checkShipping() {
    const cost = price.querySelector(".shipping-cost");
    const selectedShippingType = JSON.parse(localStorage.getItem("chosen_shipping_type"));
    const btn = footer.querySelector(".continueBtn");

    if (selectedShippingType) {
      shippingItem.innerHTML = "";
      cost.innerText = `$ ${selectedShippingType.price}`
      btn.disabled = false;

      shippingItem.append(El({
        element: "div",
        className: "type-option bg-white rounded-3xl py-5 px-7 shadow flex justify-between items-center",
        children: [
          El({
            element: "div",
            className: "rounded-full w-12 h-12 bg-black flex items-center justify-center",
            children: [
              El({
                element: "img",
                className: "w-10 h-10",
                src: selectedShippingType.src
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
                innerText: selectedShippingType.name
              }),
              El({
                element: "p",
                className: "arrival-p text-black/60 text-sm font-bold",
                innerText: selectedShippingType.detail
              })
            ]
          }),
          El({
            element: "div",
            className: "price text-back text-xl font-bold",
            innerText: `$ ${selectedShippingType.price}`
          }),
          El({
            element: "img",
            className: "w-7 h-7 cursor-pointer",
            src: "/images/edit.png",
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate("/shipping-type")
              }
            ]
          })
        ]
      }));
    }
    else {
      cost.innerText = `$ ${0}`
      shippingItem.innerHTML = "";
      btn.disabled = true;
      shippingItem.append(El({
        element: "div",
        className: "bg-white rounded-3xl p-5 shadow flex justify-between items-center cursor-pointer",
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/shipping-type")
          }
        ],
        children: [
          El({
            element: "div",
            className: "flex gap-5 items-center p-2",
            children: [
              El({
                element: "img",
                className: "w-8 h-8",
                src: "/images/truck.png"
              }),
              El({
                element: "h4",
                className: "text-lg font-bold text-black ",
                innerText: "Choose Shipping Type"
              })
            ]
          }),
          El({
            element: "img",
            className: "w-7 h-7 cursor-pointer",
            src: "/images/right-icon.png"
          })
        ]
      }))
    };
  }
  checkShipping()

  function handleDiscount() {

    const inputBoxValue = inputBox.querySelector(".discount-input");
    if (inputBoxValue.value.trim() === "Discount30") {
      store.setState("useDiscount", true);
      showToast("Discount code has been applied", "green");
    }
    else {
      showToast("Promo code you entered is not valid!", "red")
    }
  }

  async function orderListData() {
    orderListChild.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-black"></div >
        <p class="mt-4 text-gray-800 font-bold">Loading ... </p></div>`

    const priceBox = price.querySelector(".amount");
    const orderData = await getCartProducts();
    orderListChild.innerHTML = "";
    const priceArray = [];
    orderData.map(item => {
      orderListChild.append(createOrder(item, orderListData));
      priceArray.push(item.quantity * item.sneaker.price);
    });
    const amountPrice = priceArray.reduce((sum, current) => sum + current, 0);
    priceBox.innerText = `$ ${amountPrice}`;
    store.setState("useDiscount", false);

    const AllBtns = orderListChild.querySelectorAll(".btn");
    const deleteBtns = orderListChild.querySelectorAll(".delete-option");
    deleteBtns.forEach(btn => {
      btn.classList.add("hidden");
    });
    AllBtns.forEach(btn => {
      btn.classList.add("hidden");
    });

  }
  orderListData()

  store.subscribe("useDiscount", (value) => {
    const newValue = value ?? false;
    const amountPrice = Number(price.querySelector(".amount").innerText.split(" ")[1]);
    const shippingPrice = Number(price.querySelector(".shipping-cost").innerText.split(" ")[1]);
    const totalPriceBox = price.querySelector(".total-price");

    const promoDiv = price.querySelector(".promo-box");
    const discountBox = code.querySelector(".discount-code");
    const promoPriceBox = price.querySelector(".promo-discount");
    const PromoDiscountPrice = (amountPrice) * 30 / 100;

    let totalPrice = 0;

    if (newValue) {
      inputBox.innerHTML = "";
      inputBox.append(El({
        element: "div",
        className: "w-1/2 relative bg-black text-white rounded-3xl py-3 pl-6 shadow flex justify-start items-center font-semibold text-sm text-black/50 focus:ring-2 focus:ring-black transition-ring duration-300",
        innerText: "Discount 30% Off",
        children: [
          El({
            element: "img",
            classList: "w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer",
            src: "/images/closeBox.png",
            eventListener: [
              {
                event: "click",
                callback: () => store.setState("useDiscount", false)
              }
            ]
          })
        ]
      }));

      promoDiv.classList.remove("hidden");
      promoPriceBox.innerText = `$ -${PromoDiscountPrice}`;

      discountBox.classList.add("hidden")
      totalPrice = amountPrice + shippingPrice - PromoDiscountPrice;

    }
    else {

      inputBox.innerHTML = "";
      inputBox.append(El({
        element: "input",
        className: "w-full discount-input bg-black/5 rounded-3xl pl-5 py-4 shadow flex justify-start items-center font-semibold text-sm text-black/50 focus:ring-2 focus:ring-black transition-ring duration-300",
        restAttrs: {
          placeholder: "Enter Promo Code"
        }
      }))

      promoDiv.classList.add("hidden");
      discountBox.classList.remove("bg-green-50", "hidden")
      totalPrice = amountPrice + shippingPrice;
    }
    totalPriceBox.innerText = `$ ${totalPrice}`;
  })

  const checkOutContainer = El({
    element: "div",
    className: "flex flex-col gap-5 p-5 w-full",
    children: [
      El({
        element: "div",
        className: "flex items-center justify-between mt-5",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-3",
            children: [
              El({
                element: "img",
                className: "w-8 cursor-pointer",
                src: "/images/arrow-left.png",
                eventListener: [
                  {
                    event: "click",
                    callback: () => router.navigate("/cart")
                  }
                ]
              }),
              El({
                element: "h2",
                className: "text-black text-2xl font-bold",
                innerText: "Checkout"
              })
            ]
          }),
          El({
            element: "img",
            className: "w-8 h-8 cursor-pointer",
            src: "/images/menu.png"
          })
        ]
      })
    ]
  })

  checkOutContainer.append(address, createLine(), orderList, createLine(), shipping, createLine(), code, price);

  const page = El({
    element: "div",
    className: "flex flex-col h-screen w-full bg-gray-50/60 overflow-y-auto scrollbar-hide",
  })
  page.append(checkOutContainer, footer)
  return page
}