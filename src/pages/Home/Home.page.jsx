import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HERO_IMAGE from "../../assets/hero_image.png";
import MOBILE_HERO_IMAGE from "../../assets/hero_mobile_image.png";
import Footer from "../../components/Footer/Footer.component";
import Modal from "../../components/Modals/Modal.component";
import Navbar from "../../components/Navbar/Navbar.component";
import About from "../../sections/About.section";
import Contact from "../../sections/Contact.section";
import Hero from "../../sections/Hero.section";
import Testimonials from "../../sections/Testimonials.section";
import TopCharts from "../../sections/TopCharts.section";
import { auth } from "../../utils/firebase";
import Login from "../Authentication/Login.page";
import SignUp from "../Authentication/SignUp.page";

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
        className="absolute top-0 left-0 h-[100vh] object-cover z-0 hidden md:block"
      />
      <div className="absolute inset-0 h-[100vh] bg-black/65 z-5 hidden md:block"></div>
      <img
        src={MOBILE_HERO_IMAGE}
        alt=""
        className="absolute top-0 left-0 w-full h-[100vh] object-cover z-0 md:hidden"
      />
      <div className="absolute inset-0 h-[100vh] bg-black/80 z-5 md:hidden"></div>
      <div className="container mx-auto">
        <Hero onClick={handleLogin} />
        <About />
        <TopCharts onClick={handleLogin} />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
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
