import { getAuth } from "firebase/auth";
import SideMenu from "../Menus/SideMenu.component";
import DashboardNavbar from "../Navbar/DashboardNavbar.component";

const DashboardLayout = ({ children, activeMenu }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div>
      <DashboardNavbar activeMenu={activeMenu} />
      {user && (
        <div className="flex bg-bg-black">
          <div className="hidden md:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
