import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-10"} ${height || "h-10"} ${
        style || ""
      } flex items-center justify-center rounded-full text-white font-medium bg-bg-black`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
