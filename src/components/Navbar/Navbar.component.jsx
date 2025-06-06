import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { navLinks } from "../../utils/data";
import { auth } from "../../utils/firebase";
import ProfileCard from "../Cards/ProfileCard.component";

const Navbar = ({ onClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const menuRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-nav-scroll shadow-md text-white backdrop-blur-lg py-3 md:py-4"
          : "bg-transparent py-4 md:py-6 text-white"
      }`}
    >
      <a
        href="/"
        className="flex flex-row gap-2 items-start font-semibold text-xl font-montserrat"
      >
        <p className="font-playwrite text-5xl text-primary">M</p>
        <div className="flex flex-col">
          <p className="text-primary">Movie</p>
          <p className="text-white">Explorer</p>
        </div>
      </a>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="group flex flex-col gap-0.5 text-white"
          >
            {link.name}
            <div className="bg-primary h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="text-white hover:text-primary p-2 rounded-full transition-all duration-500 cursor-pointer"
      >
        {theme === "dark" ? (
          <LuSun className="text-white" size={24} />
        ) : (
          <LuMoon className="text-white" size={24} />
        )}
      </button>

      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <ProfileCard />
        ) : (
          <button
            className="bg-primary text-white hover:bg-accent px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
            onClick={onClick}
          >
            Login
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="h-6 w-6 cursor-pointer"
          fill="none"
          stroke="#FA5500"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-3/4 h-screen bg-card text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-white transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-5">
          {isLoggedIn ? (
            <ProfileCard />
          ) : (
            <button
              className="bg-primary text-white hover:bg-accent px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer"
              onClick={onClick}
            >
              Login
            </button>
          )}
        </div>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
