import { El } from "../../../utils/el";
import { router } from "../../../utils/router";
import { CartIcon, HomeIcon, OrderIcon, ProfileIcon, WalletIcon } from "../../icons/svgs";

export function Footer() {

  function createMenuItem(title, Icon, path, isDisabled = false) {
    const isActive = router.getCurrentRoute() === path;

    const cursorClass = isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer";

    return El({
      element: "div",
      className: "flex flex-col gap-1 items-center cursor-pointer",
      children: [
        El({
          element: "div",
          className: "w-7",
          innerHTML: Icon(isActive && !isDisabled),
        }),
        El({
          element: "div",
          className: "text-xs text-black font-bold",
          innerText: title,
        }),
      ],
      eventListener: isDisabled ? [] : [
        {
          event: "click",
          callback: () => {
            router.navigate(path)
          }
        },
      ],
    });
  }

  const home = createMenuItem("Home", HomeIcon, "/");
  const cart = createMenuItem("Cart", CartIcon, "/cart");
  const wallet = createMenuItem("Wallet", WalletIcon, "/wallet", true);
  const profile = createMenuItem("Profile", ProfileIcon, "/profile");
  const order = createMenuItem("Order", OrderIcon, "/order", true);

  const footerContainer = El({
    element: "div",
    className: "flex items-center justify-between bg-white sticky bottom-0 inset-x-0 px-10 py-3",
    children: [
      home,
      cart,
      order,
      wallet,
      profile
    ]
  })
  return footerContainer
}
