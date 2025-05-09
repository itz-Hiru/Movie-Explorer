import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { validateEmail } from "../../utils/helper";
import Input from "../../components/Inputs/Input.component";
import { toast } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";

const SignUp = ({ setCurrentPage, closeModal }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token);
          closeModal();
          setIsModalVisible(false);
          navigate("/home");
        });
      }
    });

    return () => unsubscribe();
  }, [navigate, closeModal]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);

      toast.success(
        `Welcome, ${name}! Your account has been created successfully.`
      );
      closeModal();
      setIsModalVisible(false);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already registered. Please use a different email."
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error(
          "Invalid email format. Please enter a valid email address."
        );
      } else {
        console.error("Authentication error:", error.message);
        toast.error("Failed to create account. Please try again.");
      }
    }
  };

  return (
    <CSSTransition
      in={isModalVisible}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-black">
        <h2 className="text-white text-2xl font-semibold mb-2">Signup</h2>
        <p className="text-white/60 text-[13px] mb-4">
          Create your account and dive into a universe of endless entertainment.
        </p>
        <form onSubmit={handleSignUp} className="flex flex-col gap-2">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Input
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-Enter your password"
          />
          <button
            type="submit"
            className="bg-primary py-2 font-semibold text-[18px] text-white rounded-lg hover:bg-accent transition-colors duration-500 cursor-pointer"
          >
            Signup
          </button>
        </form>
        <p className="text-[13px] text-white mt-3">
          Already have an account?{" "}
          <button
            className="font-normal text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </div>
    </CSSTransition>
  );
};

export default SignUp;
