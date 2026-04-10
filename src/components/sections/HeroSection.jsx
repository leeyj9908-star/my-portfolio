import Globe from '../Globe';

function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-base-100 flex items-center px-4 md:px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-base-content/50 text-sm font-medium tracking-widest uppercase mb-4">
            Frontend Developer &amp; Designer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#D4C5A9] to-[#6AA8D4] bg-clip-text text-transparent">
              이은주
            </span>
          </h1>
          <p className="text-base-content/60 text-lg max-w-md mx-auto md:mx-0 mb-8">
            여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          </p>
          <div className="flex gap-3 justify-center md:justify-start flex-wrap">
            <a href="#about" className="btn btn-primary btn-sm md:btn-md">
              About Me
            </a>
            <a href="#contact" className="btn btn-outline btn-sm md:btn-md border-white/20 text-base-content hover:bg-white/10">
              Contact
            </a>
          </div>
        </div>

        {/* Right: Globe */}
        <div className="flex-1 flex justify-center items-center">
          <Globe />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
