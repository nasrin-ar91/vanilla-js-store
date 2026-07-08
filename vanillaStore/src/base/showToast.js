import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function showToast(text, color) {
  Toastify({
    text: text,
    duration: 4000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: color,
      borderRadius: "8px",
      fontFamily: "inter",
    },
  }).showToast();
}