import { loginUser, signUpUser } from "../../api/userApi/userApi";
import { setCookie } from "../../base/cookie";
import { showToast } from "../../base/showToast";
import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function Login() {

  const form = El({
    element: "form",
    className: "flex flex-col items-center gap-8 w-full",
    children: [
      El({
        element: "h2",
        className: "text-3xl font-bold mb-8",
        innerText: "Login to Your Account"
      }),
      // username
      El({
        element: "div",
        className: "relative w-full",
        children: [
          El({
            element: "input",
            className: "username p-3 pl-10 rounded-lg bg-gray-100 w-full outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-ring duration-300 peer",
            restAttrs: {
              placeholder: "Username",
              id: "username"
            },
          }),
          El({
            element: "img",
            className: "absolute left-3 top-1/2 -translate-y-1/2 !z-10 w-5 h-5 opacity-30 peer-focus:opacity-100 peer-not-placeholder-shown:opacity-100 transition-opacity duration-300 ",
            src: "./images/envelope-fill.png",
          }),
          //username error
          El({
            element: "span",
            className: "absolute -bottom-5 left-1 w-full text-red-500 text-xs font-bold invisible user-error break-words text-pretty"
          }),
        ]
      }),
      // password
      El({
        element: "div",
        className: "w-full relative",
        children: [
          El({
            element: "input",
            className: "password w-full p-3 pl-10 bg-gray-100 rounded-lg outline:none peer focus:ring-2 focus:ring-black focus:border-transparent transition-ring duration-300",
            restAttrs: {
              placeholder: "Password",
              type: "password",
              id: "password"
            }
          }),
          El({
            element: "img",
            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-30 peer-focus:opacity-100 peer-not-placeholder-shown:opacity-100 transition-opacity duration-300",
            src: "./images/lock-fill.png"
          }),
          // Show/hide password
          El({
            element: "img",
            className: "absolute right-3 top-1/2 -translate-y-1/2 !z-10 w-5 opacity-30 hover:opacity-100 transition-opacity duration-300",
            src: "./images/input-suffix.png",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  let passwordInput = form.querySelector(".password")
                  if (passwordInput) {
                    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
                  }
                }
              }
            ]
          }),
          //password error
          El({
            element: "span",
            className: "absolute -bottom-10 left-1 w-full text-red-500 text-xs font-bold invisible password-error break-words text-pretty"
          })
        ]
      }),
      // sign-up
      El({
        element: "button",
        className: "text-lg font-bold text-black mt-1",
        innerText: "Signup",
        restAttrs: {
          id: "changeFormBtn",
          type: "button"
        },
        eventListener: [
          {
            event: "click",
            callback: handleBtn
          }
        ]
      }),
      // sign-in
      El({
        element: "button",
        className: "bg-black opacity-60 text-white text-sm font-semibold p-3 rounded-full hover:opacity-90 transition-opacity duration-300 absolute bottom-10 inset-x-0 mx-10",
        innerText: "Signin",
        restAttrs: {
          id: "submitBtn",
          type: "submit"
        }
      })
    ]
  })

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const username = form.querySelector(".username").value.trim();
    const password = form.querySelector(".password").value.trim();
    const submitBtn = e.submitter;
    const userErr = form.querySelector(".user-error");
    const passwordErr = form.querySelector(".password-error");
    userErr.classList.add("invisible");
    passwordErr.classList.add("invisible");

    let isValid = true;

    if (!username || username.length < 5) {
      userErr.classList.remove("invisible");
      if (!username) userErr.innerText = "Username is required!";
      else userErr.innerText = "Username must be longer than or equal to 5 characters!";
      isvalid = false;
    } else {
      userErr.classList.add("invisible");
    }

    if (!password || !passwordRegex.test(password)) {
      passwordErr.classList.remove("invisible");
      if (!password) passwordErr.innerText = "Password is required!";
      else passwordErr.innerText = "Password must be at least 8 characters and include uppercase, lowercase, numbers, and symbols!";
      isvalid = false;
    } else {
      passwordErr.classList.add("invisible");
    }
    if (!isValid) return;

    // fetch signup
    if (submitBtn.innerText === "Signup") {
      try {
        const getSignUpUser = await signUpUser({
          username,
          password
        });
        if (!getSignUpUser?.token) {
          return;
        }
        showToast("Your account has been created successfully.", "green");
      }
      catch (error) {
        userErr.classList.remove("invisible");
        userErr.innerText = error;
      }
    }
    // fetch login
    else {
      try {
        const getLoginUser = await loginUser({
          username,
          password
        });
        if (!getLoginUser?.token) {
          return;
        }
        showToast("Signed in successfully!", "green")
        const userToken = getLoginUser.token;
        setCookie("userToken", userToken, 7);
        form.reset();
        router.navigate("/")
      }
      catch (error) {
        userErr.classList.remove("invisible");
        userErr.innerText = error;
      }
    }
  })


  function handleBtn() {
    const changeFormBtn = form.querySelector("#changeFormBtn")
    const submitBtn = form.querySelector("#submitBtn")
    const userErr = form.querySelector(".user-error");
    const passwordErr = form.querySelector(".password-error");
    userErr.classList.add("invisible");
    passwordErr.classList.add("invisible");

    if (changeFormBtn.innerText === "Signup") {
      changeFormBtn.innerText = "Login";
      submitBtn.innerText = "Signup";
      form.reset();
    } else {
      changeFormBtn.innerText = "Signup";
      submitBtn.innerText = "Signin";
    }
  }

  const loginDiv = El({
    element: "div",
    className: "relative flex items-center justify-center w-full min-h-screen p-10",
    children: [
      // arrow left
      El({
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
      }),
      // logo
      El({
        element: "img",
        className: "absolute top-40",
        src: "/images/logo.png"
      }),
      // form
      form
    ]
  })

  return loginDiv
}