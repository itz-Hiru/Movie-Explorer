import { BiCollection } from "react-icons/bi";
import { FaCompass } from "react-icons/fa";
import { FaHeart, FaUser } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdHighQuality, MdUpdate } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { TbDeviceTv } from "react-icons/tb";
import TESTIMONIAL_IMAGE_ONE from "../assets/testimonial-01.jpg";
import TESTIMONIAL_IMAGE_TWO from "../assets/testimonial-02.jpg";
import TESTIMONIAL_IMAGE_THREE from "../assets/testimonial-03.jpg";
import TESTIMONIAL_IMAGE_FOUR from "../assets/testimonial-04.jpg";
import TESTIMONIAL_IMAGE_FIVE from "../assets/testimonial-05.jpg";
import TESTIMONIAL_IMAGE_SIX from "../assets/testimonial-06.jpg";

export const navLinks = [
  { name: "Home", path: "#" },
  { name: "About", path: "#about" },
  { name: "Top Charts", path: "#top-charts" },
  { name: "Testimonials", path: "#testimonials" },
  { name: "Contact", path: "#contact" },
];

export const aboutCards = [
  {
    icon: <FaCompass className="text-primary text-[35px]" />,
    title: "Personalized Discovery",
    description:
      "Find movies tailored to your taste – explore genres, trends, and hidden gems.",
    delay: 0.3,
    initialX: -20,
  },
  {
    icon: <RiMovie2Line className="text-primary text-[35px]" />,
    title: "Seamless Experience",
    description:
      "Effortlessly browse, discover, and track your favorite movies with a sleek, intuitive design.",
    delay: 0.5,
    initialX: 20,
  },
  {
    icon: <MdUpdate className="text-primary text-[35px]" />,
    title: "Real-Time Updates",
    description:
      "Stay ahead of the curve with real-time updates on the latest blockbusters and fan favorites.",
    delay: 0.7,
    initialX: -20,
  },
  {
    icon: <BiCollection className="text-primary text-[35px]" />,
    title: "Curated Collections",
    description:
      "Handpicked collections of movies for every mood, moment, and genre – tailored just for you, every time.",
    delay: 0.9,
    initialX: 20,
  },
  {
    icon: <MdHighQuality className="text-primary text-[35px]" />,
    title: "High-Quality Streaming",
    description:
      "Experience movies in stunning high-definition quality – every detail, every frame, flawlessly rendered for your ultimate viewing pleasure.",
    delay: 1.1,
    initialX: -20,
  },
  {
    icon: <TbDeviceTv className="text-primary text-[35px]" />,
    title: "Cross-Device Sync",
    description:
      "Watch your favorite films seamlessly across devices – pick up where you left off, whether on your phone, tablet, or smart TV.",
    delay: 1.3,
    initialX: 20,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Emma R.",
    image: TESTIMONIAL_IMAGE_ONE,
    description:
      "This app is a must-have for every movie lover. The sleek, neon orange dark theme makes exploring movies feel like a cinematic experience. Easily my go-to app for discovering new films!",
    delay: 0.3,
    initialX: -20,
  },
  {
    id: 2,
    name: "Jake M.",
    image: TESTIMONIAL_IMAGE_TWO,
    description:
      "Finding my next binge has never been easier. The personalized recommendations and beautiful UI make this app a true gem. Absolutely love it!",
    delay: 0.5,
    initialX: 20,
  },
  {
    id: 3,
    name: "Sofia L.",
    image: TESTIMONIAL_IMAGE_THREE,
    description:
      "From trending hits to hidden gems, this app covers it all. The fluid animations and stunning design keep me coming back. Highly recommended!",
    delay: 0.7,
    initialX: -20,
  },
  {
    id: 4,
    name: "Chris T.",
    image: TESTIMONIAL_IMAGE_FOUR,
    description:
      "The search functionality is lightning fast, and the neon design gives it a premium feel. It’s like Netflix and IMDb had a stylish, powerful baby!",
    delay: 0.9,
    initialX: 20,
  },
  {
    id: 5,
    name: "Maya S.",
    image: TESTIMONIAL_IMAGE_FIVE,
    description:
      "This app nails the balance between style and function. The dark mode with neon accents is just perfect. I can browse for hours!",
    delay: 1.1,
    initialX: -20,
  },
  {
    id: 6,
    name: "Lucas W.",
    image: TESTIMONIAL_IMAGE_SIX,
    description:
      "It’s not just an app – it’s an experience. The user interface is smooth, and the personalized recommendations are spot on!",
    delay: 1.3,
    initialX: 20,
  },
];

export const sideMenuData = [
  {
    id: "01",
    label: "Dashboard",
    path: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    id: "02",
    label: "Favourites",
    path: "/favourites",
    icon: FaHeart,
  },
  {
    id: "03",
    label: "Profile",
    path: "/profile",
    icon: FaUser,
  },
];
