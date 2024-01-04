import axios from "axios";
import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();
  const url = "http://localhost:3000/account/signup";

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);
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
  return { isLoading, error, signup, success };
};
