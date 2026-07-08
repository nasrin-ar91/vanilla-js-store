import { getToken } from "../../base/cookie";
import { BASE_URL } from "../../constanse/url";
import { router } from "../../utils/router";



export async function categoryList() {

  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/sneaker/brands`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    const data = await res.json()
    if (!res.ok) {
      throw data.message;
      router.navigate("/login");
    }

    return data
  }

  catch (error) {
    throw error;
  }
}

export async function productList(page, limit) {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/sneaker?page=${page}&limit=${limit}&search=&brands=`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    const data = await res.json()
    if (!res.ok) {
      throw data.message;
      router.navigate("/login");
    }

    return data
  }
  catch (error) {
    throw error;
  }
}

export async function getProducts() {
  try {
    const token = getToken();
    const productsObj = await productList(1, 100);
    const products = productsObj.data;
    return products
  }
  catch (error) {
    router.navigate("/login")
    throw error;
  }
}

export async function selectedProduct(id) {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/sneaker/item/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    const data = await res.json()
    if (!res.ok) {
      throw data.message;
      router.navigate("/login");
    }
    return data
  }
  catch (error) {
    throw error;
  }
}



