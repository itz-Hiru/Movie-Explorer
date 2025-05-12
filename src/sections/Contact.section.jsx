import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaBuilding, FaPhone } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { ImLinkedin } from "react-icons/im";
import { RiWhatsappFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Input from "../components/Inputs/Input.component";
import { validateEmail } from "../utils/helper";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const isMediumOrLarger = useMediaQuery("(min-width: 768px)");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid Email Address");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter your thought");
      return;
    }

    try {
      const templateParams = {
        name,
        email,
        description,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      toast.success("Your message has been sent!");
      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (!isMediumOrLarger) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMediumOrLarger]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[95vh] w-full flex flex-col-reverse md:flex-row justify-center items-stretch gap-10 py-24 md:py-28 px-5"
    >
      <motion.div
        className="bg-card p-5 md:p-10 w-full md:w-1/3 rounded-2xl flex flex-col justify-between flex-grow shadow-md shadow-white/10"
        initial={isMediumOrLarger ? { opacity: 0, x: -50 } : {}}
        animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.9, ease: "easeOut" }}
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-8 text-white">
            GET IN TOUCH WITH{" "}
            <span className="text-primary">MOVIE EXPLORER</span>
          </h2>
          <p className="text-white/80 mb-6">
            We are always happy to hear from our customers, investors, and film
            enthusiasts.
          </p>
          <div className="w-full h-[2px] bg-white/50 mb-10" />
          <div className="flex flex-col items-start justify-center gap-6">
            <div className="flex flex-row gap-4 items-center">
              <HiOutlineMail className="text-primary text-[22px]" />
              <p className="text-white/90">movieexplorer.info@gmail.com</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <FaPhone className="text-primary text-[22px]" />
              <p className="text-white/90">+94 72 550 8919</p>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <FaBuilding className="text-primary text-[22px]" />
              <p className="text-white/90">
                216/6, Welikatiya Road, Polhena, Kelaniya
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Link to="https://wa.me/+94725508919" className="icon-button group">
            <RiWhatsappFill className="text-3xl text-white group-hover:text-green-500 transition-colors duration-300" />
          </Link>
          <Link
            to="https://www.facebook.com/profile.php?id=61562712213242"
            className="icon-button group"
          >
            <FaFacebook className="text-3xl text-white group-hover:text-blue-600 transition-colors duration-300" />
          </Link>
          <Link
            to="https://www.instagram.com/x_hiru23/profilecard/?igsh=Zmc4Y253MGFkdXNn"
            className="icon-button group"
          >
            <FaInstagramSquare className="text-3xl text-white group-hover:text-pink-700 transition-colors duration-300" />
          </Link>
          <Link
            to="https://linkedin.com/in/hirumitha"
            className="icon-button group"
          >
            <ImLinkedin className="text-3xl text-white group-hover:text-blue-700 transition-colors duration-300" />
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="bg-card p-5 md:p-10 w-full md:w-1/2 rounded-2xl flex flex-col justify-between flex-grow shadow-md shadow-white/10"
        initial={isMediumOrLarger ? { opacity: 0, x: 50 } : {}}
        animate={isMediumOrLarger && inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.9, ease: "easeOut" }}
      >
        <h3 className="text-3xl font-semibold mb-4 text-white">
          Share Your Thought With Us
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
          />
          <label className="text-[13px] text-white">Thoughts</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="input-box"
            placeholder="Your thoughts will definitely encourage us"
          />
          <button
            type="submit"
            className="py-3 px-4 w-[250px] bg-primary text-white font-semibold rounded-lg hover:bg-accent transition-all duration-500 cursor-pointer"
          >
            Share Your Thoughts
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
