import axios from "axios";

export async function Login(loginCredentials) {
  const response = await axios.post(
    `http://localhost:8080/api/auth/login`,
    loginCredentials,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
}
