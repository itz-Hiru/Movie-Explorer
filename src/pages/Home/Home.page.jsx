import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.component";
import Modal from "../../components/Modals/Modal.component";
import SignUp from "../Authentication/SignUp.page";
import Login from "../Authentication/Login.page";
import Hero from "../../sections/Hero.section";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const closeModal = () => {
    setOpenAuthModal(false);
  };

  const handleLogin = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-full min-h-screen bg-black pt-25">
      <Navbar onClick={() => setOpenAuthModal(true)} />
      <div className="container mx-auto">
        <Hero />
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
