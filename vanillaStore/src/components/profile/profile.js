import { getUser } from "../../api/userApi/userApi";
import { deleteCookie, getToken } from "../../base/cookie";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";
import { Footer } from "../shared/footer/footer";

export function Profile() {

  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  async function findUser() {
    try {
      const currentUser = await getUser(getToken());
      if (currentUser && currentUser.username) {
        const profileName = currentUser.username;
        detailBox.innerHTML = "";
        detailBox.append(createRowItem("/images/person.png", formatText(profileName), "/"),
          createRowItem("/images/heart.png", "My Wishlist", "/"),
          createRowItem("/images/order.png", "My Orders", "/checkout"),
          createRowItem("/images/cart.png", "My Cart", "/cart"),
          createRowItem("/images/wallet.png", "My Wallet", "/"))
      }
    }
    catch (error) {
      showToast("You need to log in to access this feature.", "red");
      router.navigate("/login");
    }
  }
  findUser()

  function handleLogOut() {
    deleteCookie("userToken");
    showToast("You log out successfully!", "green");
    router.navigate("/login");
  }

  const imgBox = El({
    element: "div",
    className: "flex flex-col justify-center items-center gap-5 p-5 relative",
    children: [
      El({
        element: "img",
        className: "w-40 h-40 rounded-full ring-4 ring-offset-6 ring-gray-500",
        src: "/images/profileImg.png"
      }),
      El({
        element: "div",
        className: "flex gap-5 items-center",
        children: [
          El({
            element: "img",
            className: "w-10",
            src: "/images/logo.png"
          }),
          El({
            element: "h3",
            className: "text-black font-bold text-4xl",
            innerText: "Shoea"
          })
        ]
      }),
      El({
        element: "div",
        className: "flex gap-2 items-center absolute right-5 top-5 cursor-pointer",
        eventListener: [
          {
            event: "click",
            callback: handleLogOut
          }
        ],
        children: [
          El({
            element: "div",
            className: "text-black font-bold text-lg inline-block",
            innerText: "Log Out"
          }),
          El({
            element: "img",
            className: "w-7 h-7 inline-block",
            src: "/images/logout.png"
          })
        ]
      })
    ]
  })

  function createRowItem(src, name, path) {
    return El({
      element: "div",
      className: "flex items-center justify-between cursor-pointer p-2",
      // eventListener: [
      //   {
      //     event: "click",
      //     callback: () => router.navigate(path)
      //   }
      // ],
      children: [
        El({
          element: "div",
          className: "flex gap-3 items-center",
          children: [
            El({
              element: "img",
              className: "w-6 h-6",
              src: src
            }),
            El({
              element: "div",
              className: "text-black font-bold text-lg",
              innerText: name
            })
          ]
        }),
        El({
          element: "img",
          className: "w-6",
          src: "/images/right-circle.png"
        })
      ]
    })
  }

  const detailBox = El({
    element: "div",
    className: "flex flex-col gap-5 p-5",
  })

  const footerBox = El({
    element: "div",
    className: "sticky bottom-0 flex flex-col gap-2 p-5 w-full bg-white rounded-t-4xl",
    children: [
      Footer()
    ]
  })

  const profileContainer = El({
    element: "div",
    className: "flex flex-col justify-center gap-10 pt-5",
  })

  profileContainer.append(imgBox, detailBox, footerBox)
  return profileContainer
}