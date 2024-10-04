import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface Registration {
  fullname: string;
  enrollment: string;
  semester: string;
  course: string;
  eventId:string;
  //   attendees?: mongoose.Schema.Types.ObjectId[];
  phone: string;
  email: string;
}

interface SignupResponse {
  error?: string;
  token: string;
}

const useRegistration = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const registration = async ({
    fullname,
    enrollment,
    semester,
    course,
    phone,
    email,
    eventId
  }: Registration) => {
    const success = handleInputErrors({
      fullname,
      enrollment,
      semester,
      course,
      email,
      phone,
      eventId
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          enrollment,
          semester,
          course,
          email,
          phone,
          eventId
        }),
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

  return { loading, registration };
};

export default useRegistration;

function handleInputErrors({
  fullname,
  enrollment,
  semester,
  course,
  email,
  phone,
  eventId
}: Registration): boolean {
  if (!fullname || !enrollment || !semester || !course || !email || !phone) {
    toast.error("Please fill in all fields");
    return false;
  }
  if(fullname.length<4){
    toast.error("Name Should be greater than 4 letter");
    return false;
  }
  if(enrollment.length<9 && enrollment.length>11){
    toast.error("Enrollment Should be 10 digit");
    return false;
  }
  if(phone.length!==10){
    toast.error("Phone Number must be 10 digits");
    return false;
  }
  return true;
}
