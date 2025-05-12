import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuMoon, LuSun } from "react-icons/lu";
import SideMenu from "../Menus/SideMenu.component";

const DashboardNavbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    const htmlElement = document.getElementById("html-element");
    htmlElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  return (
    <div className="flex items-center gap-5 bg-bg-black border-b border-white/30 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block md:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl text-white cursor-pointer" />
        ) : (
          <HiOutlineMenu className="text-2xl text-white cursor-pointer" />
        )}
      </button>

      <h2 className="text-xl font-semibold text-white font-montserrat">
        <span className="text-primary font-playwrite">M</span>ovie Explorer
      </h2>

      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-full bg-bg-black z-20">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}

      <button
        onClick={toggleTheme}
        className="ml-auto text-white hover:text-primary p-2 rounded-full transition-all duration-500 cursor-pointer"
      >
        {theme === "dark" ? <LuSun size={24} /> : <LuMoon size={24} />}
      </button>
    </div>
  );
};

export default DashboardNavbar;
