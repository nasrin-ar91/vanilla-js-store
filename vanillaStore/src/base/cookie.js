
export function setCookie(name, value, days = 7) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; Secure; SameSite=Strict";
}

export function getCookie(userToken) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${userToken}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export function getToken() {
  const token = getCookie("userToken");
  if (!token) {
    router.navigate("/login");
    return;
  }
  return token
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
}