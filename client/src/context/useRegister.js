import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext()

  const register = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if(response.ok)
      {
        setIsLoading(false)
        localStorage.setItem("user", JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
      }
  };
  return {register, isLoading, error}
};
