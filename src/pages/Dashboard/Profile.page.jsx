import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import Input from "../../components/Inputs/Input.component";
import toast from "react-hot-toast";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  auth,
  updatePassword,
  updateUserName,
  getProfileLastUpdated,
} from "../../utils/firebase";
import {
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastPassword, setLastPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email || "");
        setName(user.displayName || "");
        const updatedTime = await getProfileLastUpdated(user.uid);
        if (updatedTime) {
          const formattedTime = new Date(updatedTime).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
          setLastUpdate(formattedTime);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const clearData = async () => {
    setLastPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  const savePersonalInformation = async (e) => {
    e.preventDefault();

    try {
      const trimmedName = String(name).trim();

      if (!trimmedName) throw new Error("Name is required");

      if (auth.currentUser.displayName === trimmedName) {
        throw new Error("The new name is the same as the current name");
      }

      await updateUserName(auth.currentUser, trimmedName);
      const updatedTime = await getProfileLastUpdated(auth.currentUser.uid);
      setLastUpdate(updatedTime);
      clearData();
      toast.success("Name updated successfully");
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error(error.message || "Failed to update personal information");
    }
  };

  const saveSecurity = async (e) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        throw new Error("User not authenticated");
      }

      if (password !== confirmPassword)
        throw new Error("Passwords do not match");
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters long");

      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, lastPassword);

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, password);
      const updatedTime = await getProfileLastUpdated(user.uid);
      setLastUpdate(updatedTime);
      clearData();
      toast.success("Password updated successfully");

      setLastUpdate(new Date().toLocaleString());
    } catch (error) {
      console.error("Error during reauthentication or password update:", error);
      toast.error(error.message || "Failed to update password");
    }
  };

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="w-full h-full py-5 px-0 md:px-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-2">
          <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
            <h3 className="text-white text-lg font-medium mb-2">
              Personal Information
            </h3>
            <p className="text-white/75 text-sm mb-0 md:mb-5">
              Change your identity Informations
            </p>
            <button
              type="button"
              className="hidden md:flex px-6 py-2 gap-4 items-center bg-primary text-white font-medium hover:bg-accent rounded-md transition-colors duration-500 cursor-pointer"
              onClick={savePersonalInformation}
            >
              Save
              <FaArrowUpRightFromSquare />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={true}
            />
            <div className="flex md:hidden justify-start">
              <button
                type="button"
                className="flex px-6 py-2 gap-4 items-center bg-primary text-white font-medium hover:bg-accent rounded-md transition-colors duration-500 cursor-pointer mb-5"
                onClick={savePersonalInformation}
              >
                Save
                <FaArrowUpRightFromSquare />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white/45 mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-2">
          <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
            <h3 className="text-white text-lg font-medium mb-2">Security</h3>
            <p className="text-white/75 text-sm mb-0 md:mb-5">
              Last changed:{" "}
              <span className="">{lastUpdate || "Not available"}</span>
            </p>
            <button
              type="button"
              className="hidden md:flex px-6 py-2 gap-4 items-center bg-primary text-white font-medium hover:bg-accent rounded-md transition-colors duration-500 cursor-pointer"
              onClick={saveSecurity}
            >
              Save
              <FaArrowUpRightFromSquare />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              label="Last Password"
              type="password"
              placeholder="******"
              value={lastPassword}
              onChange={(e) => setLastPassword(e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex md:hidden justify-start">
              <button
                type="button"
                className="flex px-6 py-2 gap-4 items-center bg-primary text-white font-medium hover:bg-accent rounded-md transition-colors duration-500 cursor-pointer"
                onClick={saveSecurity}
              >
                Save
                <FaArrowUpRightFromSquare />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
