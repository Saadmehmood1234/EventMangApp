import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
interface SignIn {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignupResponse {
  error?: string;
  token: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    email,
  }: SignIn) => {
    const success = handleInputErrors({ fullname, username, password, confirmPassword, email });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, password, confirmPassword, email }),
      });
      const data: SignupResponse = await res.json();

      if (data.error) throw new Error(data.error);
    
      localStorage.setItem("eventUser", JSON.stringify(data));
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

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmPassword, email }: SignIn): boolean {
  if (!fullname || !username || !password || !confirmPassword || !email) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}

