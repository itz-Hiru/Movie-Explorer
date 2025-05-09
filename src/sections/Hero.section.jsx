const Hero = ({ onClick }) => {
  return (
    <section
      className="relative flex flex-col items-center md:items-start justify-center md:min-h-[80vh] mt-10 md:mt-0 px-4 overflow-hidden z-10"
      id="hero"
    >
      <div className="hidden md:flex flex-row items-center justify-center gap-2 md:gap-3 max-w-lg mb-5 w-full">
        <p className="text-white/60 text-lg">Welcome</p>
        <div className="flex-1 h-[1px] bg-white/60" />
      </div>

      <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 max-w-[600px] text-center md:text-start">
        Let's Make Your{" "}
        <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9500_0%,_#FF1200_100%)] bg-[length:200%_200%] animate-text-shine">
          Own Cinema
        </span>
      </h1>
      <p className="text-white/85 max-w-lg mb-8 text-center md:text-start">
        Explore trending hits, timeless classics, and hidden gems. Dive deep
        into the world of cinema, curated just for you.
      </p>
      <div className="flex flex-col md:flex-row gap-5">
        <a 
          href="top-chart"
          className="bg-transparent text-primary hover:bg-accent hover:text-white px-14 py-3 border border-accent rounded-md transition-colors duration-500 cursor-pointer"
        >Top Charts</a>
        <button 
          type="button"
          onClick={onClick}
          className="bg-accent text-white hover:bg-transparent hover:text-primary px-14 py-3 border border-accent rounded-md transition-colors duration-500 cursor-pointer"
        >Get Started</button>
      </div>
    </section>
  );
};

export default Hero;
