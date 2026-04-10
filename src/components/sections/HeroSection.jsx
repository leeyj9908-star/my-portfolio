import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StatefulButton from '../StatefulButton';

/**
 * PointerHighlightText — Aceternity pointer-highlight-demo 스타일
 * 커서 위치에 반응하는 마커형 텍스트 하이라이트 효과
 */
function PointerHighlightText({ children }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0.5); // 0~1 normalized
  const x = useSpring(rawX, { stiffness: 400, damping: 40 });

  /* 커서 X 위치에 따라 하이라이트 중심이 이동 */
  const highlightBg = useTransform(
    x,
    (v) =>
      `radial-gradient(180px 60px at ${v * 100}% 90%, rgba(106,168,212,0.35) 0%, rgba(106,168,212,0.08) 60%, transparent 100%)`,
  );

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        rawX.set(0.5);
      }}
      className="relative inline-block cursor-default select-none"
    >
      {/* 포인터 하이라이트 오버레이 */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 -inset-y-2 rounded-xl pointer-events-none z-0"
        style={{ background: highlightBg }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* 로드 시 왼→오 스윕 언더라인 */}
      <motion.span
        aria-hidden
        className="absolute bottom-1 left-0 h-[3px] rounded-full pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(106,168,212,0.9))',
        }}
        initial={{ width: '0%' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* 실제 텍스트 */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/**
 * 섹션 전체 스포트라이트 (배경 마우스 추적)
 */
function SectionSpotlight({ children }) {
  const ref = useRef(null);
  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);
  const sx = useSpring(rawX, { stiffness: 350, damping: 40 });
  const sy = useSpring(rawY, { stiffness: 350, damping: 40 });
  const bg = useTransform(
    [sx, sy],
    ([cx, cy]) =>
      `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(106,168,212,0.09), transparent 70%)`,
  );

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rawX.set(e.clientX - r.left);
        rawY.set(e.clientY - r.top);
      }}
      onMouseLeave={() => { rawX.set(-9999); rawY.set(-9999); }}
      className="relative"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: bg }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroSection() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <SectionSpotlight>
      <section className="min-h-[calc(100vh-4rem)] bg-base-100 flex items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
        <div className="max-w-3xl w-full text-center flex flex-col items-center gap-8">
          <p className="text-base-content/50 text-sm font-medium tracking-widest uppercase">
            Frontend Developer &amp; Designer
          </p>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <PointerHighlightText>
              <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
                EUNJU LEE
              </span>
            </PointerHighlightText>
          </h1>

          <p className="text-base-content/60 text-lg max-w-md">
            여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <StatefulButton onClick={() => scrollTo('about')}>
              About Me
            </StatefulButton>
            <StatefulButton variant="outline" onClick={() => scrollTo('contact')}>
              Contact
            </StatefulButton>
          </div>
        </div>
      </section>
    </SectionSpotlight>
  );
}

export default HeroSection;
