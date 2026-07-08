import { BASE_URL } from "../../constanse/url";
import { router } from "../../utils/router";


export async function signUpUser(newUser) {
  try {

    const res = await fetch(`${BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }

    );

    const data = await res.json()

    if (!res.ok) {
      const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw errMsg;
    }

    return data
  }

  catch (error) {
    throw error;
  }

}

export async function loginUser(user) {
  try {

    const res = await fetch(`${BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }
    );

    const data = await res.json()

    if (!res.ok) {
      const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw errMsg;
    }

    return data
  }

  catch (error) {
    throw error;
  }

}

export async function getUser(token) {
  try {
    const res = await fetch(`${BASE_URL}/user`,
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
      const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw errMsg;
      router.navigate("/login")
    }

    return data
  }

  catch (error) {
    throw error;
  }
}

export async function deleteUser(token) {
  try {
    const res = await fetch(`${BASE_URL}/user`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
      }

    );

    const data = await res.json()

    if (!res.ok) {
      const errMsg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw errMsg;
    }

    return data
  }

  catch (error) {
    throw error;
  }

}