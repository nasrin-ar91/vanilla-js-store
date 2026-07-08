import { categoryList } from "../../api/productsApi/productsApi";
import { getToken } from "../../base/cookie";
import { El } from "../../utils/el";
import { store } from "../../utils/store";


export async function getBrandsMenu(menuBox) {
  const token = getToken();
  // convert uppercase brands text from backend
  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  function createMenu(item, isActiveDefault = "false") {

    return El({
      element: "button",
      className: "brand-btn px-4 py-1 border-2 border-black rounded-full text-black font-semibold shrink-0 data-[active=true]:bg-black data-[active=true]:text-white",
      innerText: item === "All" ? item : formatText(item),
      restAttrs: {
        "data-active": isActiveDefault
      },
      eventListener: [
        {
          event: "click",
          callback: (e) => handlePushBtn(e)
        }
      ]
    });
  }

  function handlePushBtn(e) {
    const allButtons = menuBox.querySelectorAll(".brand-btn");
    allButtons.forEach(btn => {
      btn.setAttribute("data-active", "false");
    });
    e.target.setAttribute("data-active", "true");
    store.setState("brand", e.target.innerText.toLowerCase());
  }

  try {
    const allBtn = createMenu("All", "true")
    store.setState("brand", "All");
    menuBox.append(allBtn);;
    const brands = await categoryList(token);
    brands.forEach(item => menuBox.append(createMenu(item)))
  }
  catch (error) {
    throw error;
  }
}





