import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Input from "../../components/Inputs/Input.component";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { toast } from "react-hot-toast";
import { CSSTransition } from "react-transition-group";

const Login = ({ setCurrentPage, closeModal }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem("authToken", token);
          closeModal();
          setIsModalVisible(false);
          navigate("/");
        });
      }
    });

    return () => unsubscribe();
  }, [navigate, closeModal]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      localStorage.setItem("authToken", token);
      toast.success("Login successful!");
      closeModal();
      setIsModalVisible(false);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error(
          "Invalid email format. Please enter a valid email address."
        );
      } else {
        console.error("Authentication error:", error.message);
        toast.error("Failed to log in. Please try again.");
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
        <h2 className="text-white text-2xl font-semibold mb-2">Login</h2>
        <p className="text-white/60 text-[13px] mb-4">
          Unlock a world of entertainment. Your journey starts here.
        </p>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
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
          <button
            type="submit"
            className="bg-primary py-2 font-semibold text-[18px] text-white rounded-lg hover:bg-accent transition-colors duration-500 cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-[13px] text-white mt-3">
          Don't have an account?{" "}
          <button
            className="font-normal text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </div>
    </CSSTransition>
  );
};

export default Login;
