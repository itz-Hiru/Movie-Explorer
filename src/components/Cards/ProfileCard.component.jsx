import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileCard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      await signOut(auth);
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
        <FaUser className="text-black text-xl" />
      </div>
      <div className="flex flex-col gap-0.2 items-center md:items-start">
        <p className="text-[15px] text-white font-semibold">
          {userName || "User"}
        </p>
        <button
          onClick={handleLogout}
          className="text-primary hover:underline cursor-pointer transition-all duration-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
