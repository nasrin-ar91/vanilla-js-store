import { addToCart, getCartProducts } from "../../api/cartApi/cartApi";
import { selectedProduct } from "../../api/productsApi/productsApi";
import { createLine } from "../../base/createLine";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { store } from "../../utils/store";

export function CreateDetailCard(param) {

  let quantityOfProduct = 0;
  store.setState("productQuantity", 1);

  const productDetail = El({
    element: "div",
    className: "flex flex-col items-center justify-center h-screen w-screen overflow-auto scrollbar-hide relative"
  })

  async function handleAddToCart() {
    const sneakerId = Number(param.id);
    const quantity = store.getState("productQuantity") || 1;

    const orderedProduct = await getCartProducts();
    const findProduct = orderedProduct.find(item => item.sneaker.id === sneakerId)
    const availableProduct = quantityOfProduct - (findProduct?.quantity ?? 0);

    if (quantity <= availableProduct) {
      await addToCart({
        sneakerId,
        quantity
      });
      showToast("Add to cart successfully!", "green")
    }
    else {
      showToast("Not enough stock!", "red");
    }
  }

  async function fetchData() {
    productDetail.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-black"></div >
      <p class="mt-4 text-gray-800">Loading ... </p></div>`;

    const selectedcard = await selectedProduct(param.id)
    const size = (selectedcard.sizes).split("|");
    const color = (selectedcard.colors).split("|");
    quantityOfProduct = selectedcard.pid;

    headerDetail.querySelector(".h2-box").innerText = selectedcard.name;
    price.querySelector(".price-box").innerText = `$ ${selectedcard.price}`;
    imageBox.src = selectedcard.imageURL;
    variantSection.querySelector(".size-box").append(...size.map(itemSize => {
      return El({
        element: "div",
        className: "inline-block",
        children: [
          El({
            element: "input",
            className: "hidden peer",
            restAttrs: {
              type: "radio",
              name: "product-size",
              value: itemSize,
              id: `size-${itemSize}`
            }
          }),
          El({
            element: "label",
            className: "inline-flex justify-center items-center w-10 h-10 border-2 border-gray-400 rounded-full font-bold cursor-pointer transition-all duration-300 peer-checked:bg-black peer-checked:text-white",
            innerText: `${itemSize}`,
            restAttrs: {
              for: `size-${itemSize}`
            }
          })
        ]
      })
    }))

    variantSection.querySelector(".color-box").append(...color.map(itemColor => {
      return El({
        element: "div",
        className: "inline-block shrink-0",
        children: [
          El({
            element: "input",
            className: "hidden peer",
            restAttrs: {
              type: "radio",
              name: "product-color",
              value: `${itemColor}`,
              id: `color-${itemColor}`
            }
          }),
          El({
            element: "label",
            className: "border-1 border-gray-300 flex justify-center items-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 shadow-lg peer-checked:opacity-90 group",
            restAttrs: {
              for: `color-${itemColor}`,
              style: `background-color:${itemColor}`
            },
            children: [
              El({
                element: "span",
                className: "hidden group-peer-checked:flex items-center justify-center text-xl text-white font-bold select-none mix-blend-difference",
                innerText: "✓"
              })
            ]
          }),
        ]
      })
    }))

    productDetail.innerHTML = "";
    productDetail.append(imageBox, detailBox, backArrow)
  }

  function handleDecrement() {
    const quantityValue = store.getState("productQuantity") || 1;
    if (quantityValue <= 1) return;
    store.setState("productQuantity", quantityValue - 1);
  }

  function handleIncrement() {
    const quantityValue = store.getState("productQuantity") || 1;
    if (quantityValue >= quantityOfProduct) return;
    store.setState("productQuantity", quantityValue + 1);
  }

  const headerDetail = El({
    element: "div",
    className: "flex flex-col gap-3 justify-start relative",
    children: [
      El({
        element: "h2",
        className: "text-2xl font-bold h2-box",
      }),
      El({
        element: "div",
        className: "flex gap-8 items-center",
        children: [
          El({
            element: "div",
            className: "bg-gray-200 rounded-xl py-2 px-4 text-sm font-larger text-black",
            innerText: "5.371 sold"
          }),
          El({
            element: "div",
            className: "flex items-center gap-1",
            children: [
              El({
                element: "img",
                src: "/images/person.png"
              }),
              El({
                element: "div",
                className: "text-black opacity-70 text-sm",
                innerText: "4.3 (5.389 reviews)"
              })
            ]
          })
        ]
      }),
      El({
        element: "img",
        className: "absolute right-1 top-1",
        src: "/images/heart.png"
      })
    ]
  })

  const descriptionText = El({
    element: "div",
    className: "flex flex-col gap-3",
    children: [
      El({
        element: "h3",
        className: "text-lg font-semibold text-black",
        innerText: "Description"
      }),
      El({
        element: "p",
        className: "",
        innerText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, commodi tempora. Reprehenderit rerum in minus sunt laudantium soluta at odio."
      })
    ]
  })

  const variantSection = El({
    element: "div",
    className: "flex gap-14 w-full items-start min-w-0",
    children: [
      //size
      El({
        element: "div",
        className: "flex flex-col gap-3 shrink-0",
        children: [
          El({
            element: "h3",
            className: "text-lg font-semibold text-black",
            innerText: "Size"
          }),
          El({
            element: "div",
            className: "size-box flex gap-3 options",
          })
        ]
      }),
      //color
      El({
        element: "div",
        className: "flex flex-col justify-start gap-3 flex-1 min-w-0 overflow-hidden",
        children: [
          El({
            element: "h3",
            className: "text-lg font-semibold text-black",
            innerText: "Color"
          }),
          El({
            element: "div",
            className: "color-box flex flex-row flex-nowrap gap-3 options py-1 overflow-x-auto whitespace-nowrap scrollbar-hide w-full",
          })
        ]
      })
    ]
  })

  const quantity = El({
    element: "div",
    className: "flex gap-5 items-center",
    children: [
      El({
        element: "h3",
        className: "text-lg font-semibold text-black",
        innerText: "Quantity"
      }),
      El({
        element: "div",
        className: "bg-gray-100 rounded-full px-2 flex gap-2 items-center",
        children: [
          El({
            element: "button",
            className: "down-button flex items-center justify-center text-2xl font-bold px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed",
            innerText: "-",
            eventListener: [{
              event: "click",
              callback: handleDecrement
            }]
          }),
          El({
            element: "span",
            className: "quantity-box flex items-center justify-center text-lg text-center font-bold px-3 py-1",
            innerText: 1,
          }),
          El({
            element: "button",
            className: "up-button flex items-center justify-center text-2xl font-bold px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed",
            innerText: "+",
            eventListener: [{
              event: "click",
              callback: handleIncrement
            }]
          })
        ]

      })
    ]

  })

  const price = El({
    element: "div",
    className: "flex items-center gap-6 w-full",
    children: [
      El({
        element: "div",
        className: "flex flex-col gap-1 justify-star",
        children: [
          El({
            element: "div",
            className: "text-black font-bold opacity-50",
            innerText: "Total price"
          }),
          El({
            element: "div",
            className: "price-box text-black font-bold text-xl",
          })
        ]
      }),
      El({
        element: "button",
        className: "flex-1 flex items-center justify-center bg-black text-white font-semibold py-4 px-6 rounded-full gap-3 cursor-pointer ",
        eventListener: [
          {
            event: "click",
            callback: handleAddToCart
          }
        ],
        children: [
          El({
            element: "img",
            className: "w-6 h-6 inline-block",
            src: "/images/basket.png"
          }),
          El({
            element: "span",
            className: "inline-block text-center",
            innerText: "Add to Cart",
          })
        ]
      })
    ]
  })

  const detailBox = El({
    element: "div",
    className: "p-6 flex flex-col gap-3 w-full",
    children: [
      headerDetail,
      createLine(),
      descriptionText,
      variantSection,
      quantity,
      createLine(),
      price
    ]
  })

  const imageBox = El({
    element: "img",
    className: "w-full object-cover",
  })

  const backArrow = El({
    // arrow left
    element: "img",
    className: "absolute left-5 top-5 hover:cursor-pointer",
    src: "/images/arrow-left.png",
    eventListener: [
      {
        event: "click",
        callback: () => {
          router.navigate("/")
        }
      }
    ]
  })

  store.subscribe("productQuantity", (value) => {
    const quantityValue = value;
    const quantityBox = quantity.querySelector(".quantity-box");
    const upButton = quantity.querySelector(".up-button");
    const downButton = quantity.querySelector(".down-button");

    downButton.disabled = quantityValue <= 1;
    upButton.disabled = quantityValue >= quantityOfProduct;

    quantityBox.innerText = quantityValue;
  })

  fetchData();

  return productDetail
}