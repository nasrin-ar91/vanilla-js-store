import debounce from "lodash.debounce";
import { getProducts } from "../../api/productsApi/productsApi";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { createSearchCard } from "./createSearchCard";
import { createLine } from "../../base/createLine";
import { Footer } from "../shared/footer/footer";

export function Search() {

  const fisrtSearchValue = localStorage.getItem("searchQuery") || "";
  const currentPath = router.getCurrentRoute();

  function renderHistory() {
    history.innerHTML = "";
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.forEach(searchItem => history.appendChild(historyItem(searchItem)));
  }

  function handleSearch(newSearchValue, isInitialLoad = false) {
    const searchValue = newSearchValue ? newSearchValue.trim() : "";
    resultHeader.innerHTML = "";
    let quantity = 0;

    if (searchValue !== "") {
      router.navigate(`${currentPath}?q=${encodeURIComponent(searchValue)}`);

      let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      searchHistory = searchHistory.filter(item => item !== searchValue);
      searchHistory.unshift(searchValue);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      renderHistory();

      searchProduct()
      async function searchProduct() {
        resultBox.innerHTML = `<div class="col-span-2 flex flex-col items-center justify-center"><div class="inline-block animate-spin rounded-full h-12 w-12 border-b-3 border-black"></div >
      <p class="mt-4 text-gray-800">Loading ... </p></div>`;

        const productList = await getProducts();
        const result = productList.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        if (result.length !== 0) {
          quantity = result.length;
          resultBox.innerHTML = "";
          result.map(item => {
            return resultBox.append(createSearchCard(item.imageURL, item.name, item.price, item.id))
          })
        }
        else {
          resultBox.innerHTML = "";
          resultBox.append(notFoundBox)
        }

        const resultEl = El({
          element: "div",
          className: "flex flex-1 justify-between items-center font-bold p-2",
          children: [
            El({
              element: "div",
              className: "inline-block text-xl result-show",
              innerText: `Results for "${searchValue}"`
            }),
            El({
              element: "div",
              className: "inline-block text-lg result-count",
              innerText: `${quantity} found`
            })
          ]
        })
        resultHeader.append(resultEl);
      }

    }
    else {
      router.navigate(currentPath);
      resultBox.innerHTML = "";
      if (!isInitialLoad) {
        showToast("Please type something to search.", "red");
        resultBox.append(notFoundBox);
      }
    }
  }

  const notFoundBox = El({
    element: "div",
    className: "col-span-2 flex flex-col items-center justify-center gap-3",
    children: [
      El({
        element: "img",
        classList: "w-70 h-70",
        src: "images/not-found.png"
      }),
      El({
        element: "div",
        className: "font-bold text-xl text-black",
        innerText: "Not Found"
      }),
      El({
        element: "p",
        className: "text-black text-lg text-center",
        innerText: "Sorry, the keyword you entered cannot be found. please check again or search with another keyword."
      })
    ]
  })

  const HeaderMenu = El({
    element: "div",
    className: "flex justify-between items-center font-bold p-2",
    children: [
      El({
        element: "div",
        className: "inline-block text-xl result-show",
        innerText: "Recent"
      }),
      El({
        element: "div",
        className: "inline-block text-lg result-count",
        innerText: "Clear All",
        eventListener: [
          {
            event: "click",
            callback: () => {
              localStorage.removeItem("searchHistory");
              renderHistory();
            }
          }
        ]
      })
    ]
  })

  function historyItem(innertext) {
    return El({
      element: "div",
      className: "flex justify-between items-center",
      children: [
        El({
          element: "div",
          className: "inline-block text-black opacity-70 text-lg font-medium",
          innerText: innertext
        }),
        El({
          element: "img",
          className: "w-6 h-6",
          src: "/images/close.png",
          eventListener: [
            {
              event: "click",
              callback: (e) => {
                let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
                searchHistory = searchHistory.filter(item => item !== innertext);
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                renderHistory();
              }
            }
          ]
        })
      ]
    })
  }

  const history = El({
    element: "div",
    className: "flex flex-col gap-3",
  })

  const searchBox = El({
    element: "div",
    className: "w-full relative inset-x-0",
    children: [
      El({
        element: "input",
        className: "shadow-lg w-full p-4 pl-12 bg-gray-100 rounded-2xl outline-none text-lg font-semibold focus:ring-2 focus:border-transparent focus:ring-black transition-ring duration-300",
        restAttrs: {
          placeholder: "Search",
          name: "searchInput",
          id: "searchInput",
          value: fisrtSearchValue
        },
        eventListener: [
          {
            event: "input",
            callback: debounce((e) => {
              const searchValue = e.target.value.trim();
              localStorage.setItem("searchQuery", searchValue);
              handleSearch(searchValue);
            }, 700)
          }
        ]
      }),
      El({
        element: "img",
        className: "absolute top-1/2 -translate-y-1/2 left-4 w-6 h-6",
        src: "/images/search.png"
      }),
      El({
        element: "img",
        className: "absolute top-1/2 -translate-y-1/2 right-5 w-6 h-6",
        src: "/images/history.png",
        eventListener: [
          {
            event: "click",
            callback: () => {
              menu.classList.toggle("hidden")
              resulContainer.classList.toggle("hidden")
            }
          }
        ]
      })
    ]
  })

  const resultHeader = El({
    element: "div",
    className: "flex w-full",
  })

  const resultBox = El({
    element: "div",
    className: "grid grid-cols-2 gap-3 overflow-y-auto flex-1 scrollbar-hide transition-all duration-300"
  })

  const resulContainer = El({
    element: "div",
    className: "flex flex-col gap-1 justify-center w-full overflow-hidden",
    children: [
      resultHeader,
      resultBox
    ]
  })

  const menu = El({
    element: "div",
    className: "flex flex-col gap-3 w-full hidden transition-all duration-500"
  })
  menu.append(HeaderMenu, createLine(), history)

  const mainContainer = El({
    element: "div",
    className: "flex-1 flex flex-col gap-5 p-5 overflow-hidden w-full"
  })
  mainContainer.append(searchBox, resulContainer, menu)

  renderHistory();
  handleSearch(fisrtSearchValue, true);

  const searchContainer = El(({
    element: "div",
    className: "h-screen w-full flex flex-col gap-5 p-5 overflow-hidden"
  }))

  searchContainer.append(mainContainer, Footer())
  return searchContainer
}
