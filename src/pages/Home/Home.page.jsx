import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Navbar from "../../components/Navbar/Navbar.component";
import Modal from "../../components/Modals/Modal.component";
import SignUp from "../Authentication/SignUp.page";
import Login from "../Authentication/Login.page";
import Hero from "../../sections/Hero.section";
import HERO_IMAGE from "../../assets/hero_image.jpg";
import MOBILE_HERO_IMAGE from "../../assets/mobile_hero_image.jpg";
import { useNavigate } from "react-router-dom";
import About from "../../sections/About.section";
import TopCharts from "../../sections/TopCharts.section";

const Home = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const closeModal = () => {
    setOpenAuthModal(false);
  };

  const handleLogin = () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="w-full min-h-screen bg-black pt-25">
      <Navbar onClick={() => setOpenAuthModal(true)} />
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute top-0 left-0 w-full h-[100vh] object-cover z-0 hidden md:block"
      />
      <div className="absolute inset-0 bg-black/75 z-5 hidden md:block"></div>
      <img
        src={MOBILE_HERO_IMAGE}
        alt=""
        className="absolute top-0 left-0 w-full h-[100vh] object-cover z-0 md:hidden"
      />
      <div className="absolute inset-0 bg-black/85 z-5 md:hidden"></div>
      <div className="container mx-auto">
        <Hero onClick={handleLogin} />
        <About />
        <TopCharts onClick={handleLogin} />
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} closeModal={closeModal} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} closeModal={closeModal} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
