import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { sideMenuData } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar.component";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-bg-black border-r border-white/30 sticky top-[61px] z-30">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center w-28 h-28 rounded-full border-primary border-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover transition-transform duration-300 ease-in-out"
              />
            ) : (
              <CharAvatar
                fullName={user?.displayName || "User"}
                width="w-24"
                height="h-24"
                style="text-3xl"
              />
            )}
          </div>
        </div>
        <h5 className="text-white font-medium leading-6 mt-3">
          {user?.displayName || "User"}
        </h5>
        <p className="text-[12px] text-white/75">{user?.email || "No email"}</p>
      </div>
      {sideMenuData.map((data, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] cursor-pointer transition-colors duration-500 ${
            activeMenu === data.label
              ? "text-white bg-gradient-to-r from-primary to-accent border-r-4 border-white"
              : "text-white"
          } py-3 px-6 mb-3`}
          onClick={() => handleClick(data.path)}
        >
          <data.icon className="text-xl" />
          {data.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
