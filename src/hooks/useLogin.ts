import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  // Add other fields as necessary
}

interface LoginResponse {
  error?: string;
  token: string;
  user: User; // Assuming the response also contains user information
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: LoginResponse = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("eventUser", JSON.stringify(data.user));
      console.log(data.token);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username: string, password: string): boolean {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
