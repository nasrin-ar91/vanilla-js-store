import { getToken } from "../../base/cookie";
import { showToast } from "../../base/showToast";
import { BASE_URL } from "../../constanse/url";
import { router } from "../../utils/router";

export async function addToCart(product) {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(product)

      }
    );

    const data = await res.json()

    if (!res.ok) {
      showToast(
        Array.isArray(data.message) ? data.message[0] : data.message,
        "red"
      );
      router.navigate("/login")
      return null
    }

    return data
  }

  catch (error) {
    throw error;
  }
}

export async function getCartProducts() {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        }
      }
    );

    const data = await res.json()

    if (!res.ok) {
      showToast(
        Array.isArray(data.message) ? data.message[0] : data.message,
        "red"
      );
      router.navigate("/login")
      return null
    }
    return data
  }
  catch (error) {
    throw error;
  }
}

export async function updateProducts(id, quantity) {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}/cart/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id, quantity })
      }
    );

    const data = await res.json()

    if (!res.ok) {
      showToast(
        Array.isArray(data.message) ? data.message[0] : data.message,
        "red"
      );
      router.navigate("/login")
      return null
    }
    return data
  }
  catch (error) {
    throw error;
  }
}

export async function deleteCart(id) {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/cart/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        }
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      showToast(
        Array.isArray(data.message) ? data.message[0] : data.message,
        "red"
      );
      router.navigate("/login")
      return null
    }

    return data
  }

  catch (error) {
    showToast("Failed to delete product!", "red")
    throw error;
  }
}