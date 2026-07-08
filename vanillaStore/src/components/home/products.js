import { getProducts } from "../../api/productsApi/productsApi";
import { createCard } from "../../base/creatCard";
import { El } from "../../utils/el";
import { store } from "../../utils/store";
import { getBrandsMenu } from "./scrollMenu";



export function Products() {



  let allProducts = [];
  async function showProducts() {
    productsListBox.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-black"></div >
      <p class="mt-4 text-gray-800 font-bold">Loading ... </p></div>`

    allProducts = await getProducts()
    store.setState("brand", "all")
  }

  store.subscribe("brand", (value) => {
    productsListBox.innerHTML = "";
    if (allProducts.length === 0) return;

    if (value === "all") {
      allProducts.forEach(item => productsListBox.append(createCard(item.imageURL, item.name, item.price, item.id)))
    }
    else {
      allProducts.filter(item => item.brand.toLowerCase() === value).forEach(filteredItem => productsListBox.append(createCard(filteredItem.imageURL, filteredItem.name, filteredItem.price, filteredItem.id)))
    }
  })

  const productHeader = El({
    element: "div",
    className: "flex justify-between",
    children: [
      El({
        element: "div",
        className: "text-black text-xl font-bold",
        innerText: "Most Popular"
      }),
      El({
        element: "div",
        className: "text-black text-lg font-semibold",
        innerText: "See All"
      }),
    ]
  })
  const scrollMenu = El({
    element: "div",
    className: "flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex-shrink-0 w-full",
  })
  const productsListBox = El({
    element: "div",
    className: "grid grid-cols-2 gap-5 overflow-y-auto flex-1 scrollbar-hide",
  })
  const container = El({
    element: "div",
    className: "flex flex-col gap-3 flex-1 overflow-hidden",
    children: [
      productHeader,
      scrollMenu,
      productsListBox
    ]
  })

  getBrandsMenu(scrollMenu);
  showProducts()

  return container
}