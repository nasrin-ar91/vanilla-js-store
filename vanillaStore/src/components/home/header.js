import { getUser } from "../../api/userApi/userApi";
import { getToken } from "../../base/cookie";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Header() {
  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  function getMessage() {
    const now = new Date();
    const currentHour = now.getHours();
    let greetingMessage = "";
    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = "Good Day";
    } else {
      greetingMessage = "Good Evening";
    }
    return greetingMessage
  }

  function getTime() {
    const now = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    return now.toLocaleTimeString("en-US", options);
  }

  const timeBox = El({
    element: "div",
    className: "flex items-center justify-start text-black/60 text-sm font-bold",
    innerText: `Logged in at: ${getTime()}`
  })

  const greeting = El({
    element: "div",
    className: "flex items-center gap-3",
    children: [
      El({
        element: "div",
        className: "text-xl text-black opacity-70",
        innerText: getMessage()
      }),
      El({
        element: "img",
        className: "h-6",
        src: "./images/hi.png"
      })
    ]
  })
  const usernameBox = El({
    element: "div",
    className: "text-lg font-bold text-black",
  })

  const svgBox = El({
    element: "div",
    className: "absolute right-3 top-1/2 -translate-y-1/2 flex gap-5",
    children: [
      El({
        element: "img",
        className: " w-5 h-5",
        src: "./images/bell.png"
      }),
      El({
        element: "img",
        className: " w-5 h-5",
        src: "./images/heart.png"
      }),
    ]
  })

  const headerContainer = El({
    element: "div",
    className: "relative flex flex-col gap-2",
    children: [
      timeBox,
      greeting,
      usernameBox,
      svgBox
    ]
  })


  async function findUser() {
    try {
      const currentUser = await getUser(getToken());
      if (currentUser && currentUser.username) {
        usernameBox.innerText = formatText(currentUser.username);
      }
      else {
        showToast("You need to log in to access this feature.", "red")
        router.navigate("/login");
      }
    }
    catch (error) {
      usernameBox.innerText = "(Failed to load profile name!";
      showToast("You need to log in to access this feature.", "red")
    }
  }
  findUser()


  return headerContainer
}