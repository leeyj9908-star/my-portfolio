import { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StatefulButton from '../StatefulButton';

/**
 * PointerHighlight — Aceternity pointer-highlight-demo 스타일
 * 박스 테두리가 무한 반복으로 자동 트레이스되는 컴포넌트
 */
function PointerHighlight({ children }) {
  const ref = useRef(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const update = () => {
      const r = ref.current.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const perim = w && h ? 2 * (w + h) : 0;
  const dash = perim * 0.22; // 트레이서 길이 = 전체 둘레의 22%

  return (
    <span
      ref={ref}
      className="relative inline-block px-6 py-3 cursor-default select-none"
    >
      {/* 내부 배경 글로우 (breathing) */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: 'rgba(106,168,212,0.07)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SVG 테두리 트레이서 */}
      {perim > 0 && (
        <svg
          aria-hidden
          className="absolute pointer-events-none"
          style={{ top: 0, left: 0, width: w, height: h, overflow: 'visible' }}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
        >
          {/* 고정 테두리 (연한 기본) */}
          <rect
            x="1" y="1" width={w - 2} height={h - 2} rx="10"
            stroke="rgba(106,168,212,0.2)" strokeWidth="1.5"
          />
          {/* 무한 트레이싱 대시 */}
          <motion.rect
            x="1" y="1" width={w - 2} height={h - 2} rx="10"
            stroke="#6AA8D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${perim - dash}`}
            animate={{ strokeDashoffset: [0, -perim] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      )}

      {/* 코너 도트 (순차 펄스) */}
      {[
        { top: -4, left: -4 },
        { top: -4, right: -4 },
        { bottom: -4, left: -4 },
        { bottom: -4, right: -4 },
      ].map((style, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute w-2 h-2 rounded-full bg-[#6AA8D4]"
          style={style}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.4, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

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
            <PointerHighlight>
              <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
                EUNJU LEE
              </span>
            </PointerHighlight>
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
