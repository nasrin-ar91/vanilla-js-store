import { CartPage } from "./pages/cart/cart";
import { CheckOutPage } from "./pages/checkout/checkout";
import { DetailProductPage } from "./pages/home/detail-product";
import { HomePage } from "./pages/home/home";
import { LoginPage } from "./pages/login/login";
import { OnBoardingPage } from "./pages/onboarding/onboarding";
import { PaymentPage } from "./pages/payment/payment";
import { ProfilePage } from "./pages/profile/profile";
import { SearchPage } from "./pages/search/search";
import { ShippingAddressPage } from "./pages/shipping/shipping-address";
import { ShippingTypeAddressPage } from "./pages/shipping/shipping-type";
import { El } from "./utils/el";
import { router } from "./utils/router";


const app = document.querySelector('#app')

const pageContainer = El({
  element: "div",
})

app.appendChild(pageContainer);


router.addRoute("/", HomePage);
router.addRoute("/onboarding", OnBoardingPage);
router.addRoute("/login", LoginPage);
router.addRoute("/product/:id", DetailProductPage);
router.addRoute("/search", SearchPage);
router.addRoute("/cart", CartPage);
router.addRoute("/checkout", CheckOutPage);
router.addRoute("/shipping-address", ShippingAddressPage);
router.addRoute("/shipping-type", ShippingTypeAddressPage);
router.addRoute("/payment", PaymentPage);
router.addRoute("/profile", ProfilePage);


router.init(pageContainer);