import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Globe from '../Globe';
import StatefulButton from '../StatefulButton';

/**
 * PointerHighlight — Aceternity UI pointer-highlight-demo 스타일
 * 마우스 커서를 따라 이동하는 방사형 스포트라이트 효과
 */
function PointerHighlight({ children }) {
  const containerRef = useRef(null);

  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);

  // 부드러운 따라오기 (spring)
  const x = useSpring(rawX, { stiffness: 400, damping: 40 });
  const y = useSpring(rawY, { stiffness: 400, damping: 40 });

  const spotlight = useTransform(
    [x, y],
    ([cx, cy]) =>
      `radial-gradient(650px circle at ${cx}px ${cy}px, rgba(106,168,212,0.13) 0%, rgba(106,168,212,0.04) 40%, transparent 70%)`,
  );

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rawX.set(-9999);
    rawY.set(-9999);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* 스포트라이트 오버레이 */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-none"
        style={{ background: spotlight }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroSection() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <PointerHighlight>
      <section className="min-h-[calc(100vh-4rem)] bg-base-100 flex items-center px-4 md:px-8 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-base-content/50 text-sm font-medium tracking-widest uppercase mb-4">
              Frontend Developer &amp; Designer
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
                EUNJU LEE
              </span>
            </h1>
            <p className="text-base-content/60 text-lg max-w-md mx-auto md:mx-0 mb-8">
              여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
            </p>
            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <StatefulButton onClick={() => scrollTo('about')}>
                About Me
              </StatefulButton>
              <StatefulButton variant="outline" onClick={() => scrollTo('contact')}>
                Contact
              </StatefulButton>
            </div>
          </div>

          {/* Right: Globe */}
          <div className="flex-1 flex justify-center items-center">
            <Globe />
          </div>
        </div>
      </section>
    </PointerHighlight>
  );
}

export default HeroSection;
