import { FaCompass } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { MdUpdate, MdHighQuality } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { TbDeviceTv } from "react-icons/tb";

export const aboutCards = [
  {
    icon: <FaCompass className="text-primary text-[35px]" />,
    title: "Personalized Discovery",
    description:
      "Find movies tailored to your taste – explore genres, trends, and hidden gems.",
    delay: 0.3,
    initialX: -20, // Adjusted value
  },
  {
    icon: <RiMovie2Line className="text-primary text-[35px]" />,
    title: "Seamless Experience",
    description:
      "Effortlessly browse, discover, and track your favorite movies with a sleek, intuitive design.",
    delay: 0.5,
    initialX: 20, // Adjusted value
  },
  {
    icon: <MdUpdate className="text-primary text-[35px]" />,
    title: "Real-Time Updates",
    description:
      "Stay ahead of the curve with real-time updates on the latest blockbusters and fan favorites.",
    delay: 0.7,
    initialX: -20, // Adjusted value
  },
  {
    icon: <BiCollection className="text-primary text-[35px]" />,
    title: "Curated Collections",
    description:
      "Handpicked collections of movies for every mood, moment, and genre – tailored just for you, every time.",
    delay: 0.9,
    initialX: 20, // Adjusted value
  },
  {
    icon: <MdHighQuality className="text-primary text-[35px]" />,
    title: "High-Quality Streaming",
    description:
      "Experience movies in stunning high-definition quality – every detail, every frame, flawlessly rendered for your ultimate viewing pleasure.",
    delay: 1.1,
    initialX: -20, // Adjusted value
  },
  {
    icon: <TbDeviceTv className="text-primary text-[35px]" />,
    title: "Cross-Device Sync",
    description:
      "Watch your favorite films seamlessly across devices – pick up where you left off, whether on your phone, tablet, or smart TV.",
    delay: 1.3,
    initialX: 20, // Adjusted value
  },
];
