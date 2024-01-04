import axios from "axios";
import { useState } from "react";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { dispatch } = useAuthContext();
  const url = "http://localhost:3000/account/login";

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(url, formData);
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      setSuccess("Success!");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setError(error.response.data.error);
    }
  };
  return { isLoading, error, login, success };
};
