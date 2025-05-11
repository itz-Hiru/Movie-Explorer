import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helper";

const Footer = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  const handleSubscribe = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to subscribe.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter valid email address.");
    }

    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        userId: user.uid,
        subscribedAt: new Date().toISOString(),
      });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing: ", error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full bg-[#151515]">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-accent/30 pb-6">
        <div className="md:max-w-96">
          <p className="text-white text-3xl font-semibold font-montserrat">
            <span className="font-playwrite text-primary font-normal">M</span>{" "}
            Explorer
          </p>
          <p className="mt-6 text-sm text-white/80">
            Explore the world of movies, from timeless classics to the latest
            blockbusters. Discover hidden gems, track your favorites, and stay
            updated with trending titles. Dive deep into the cinematic universe
            and experience the magic of film.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-white">Quick Links</h2>
            <ul className="text-sm space-y-2 text-white/75">
              <li>
                <a
                  href="#"
                  className="hover:text-accent/70 transition-colors duration-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-accent/70 transition-colors duration-500"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#top-charts"
                  className="hover:text-accent/70 transition-colors duration-500"
                >
                  Top Charts
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-accent/70 transition-colors duration-500"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p className="text-white/75">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-white/30 placeholder-white/50 text-white/85 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-primary w-24 h-9 text-white rounded cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-white">
        Copyright 2025 © Company name. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
