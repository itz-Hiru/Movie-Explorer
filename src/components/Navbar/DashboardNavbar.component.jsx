import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "../Menus/SideMenu.component";

const DashboardNavbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-bg-black border border-b border-white/30 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block md:hidden"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl text-white cursor-pointer" />
        ) : (
          <HiOutlineMenu className="text-2xl text-white cursor-pointer" />
        )}
      </button>
      <h2 className="text-xl font-semibold text-white font-montserrat"><span className="text-primary font-playwrite">M</span>ovie Explorer</h2>
      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-bg-black">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
