import HERO_IMAGE from "../assets/hero_image.jpg";

const Hero = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between relative min-h-[80vh] md:min-h-[80vh] px-4"
      id="hero"
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start mb-8 md:mb-0 text-center md:text-start">
        <h1 className="text-[28px] md:text-5xl text-white font-bold mb-6 leading-tight">
          Discover, Explore, and Immerse in the{" "}
          <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#00E0C6_0%,_#2BD67B_100%)] bg-[length:200%_200%] animate-text-shine">
            World of Cinema
          </span>
        </h1>
        <p className="max-w-md md:max-w-lg text-white/80 text-sm md:text-[16px]">
          Dive into the world of movies. Search, filter, and discover the latest
          hits and all-time favorites, tailored to your taste.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center mb-16 md:mb-0">
        <img
          src={HERO_IMAGE}
          alt="Cinema"
          className="w-full h-auto max-w-lg md:max-w-xl rounded-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
