import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import StatefulButton from '../StatefulButton';

/** 마우스 커서 SVG */
function CursorIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L7 18L10 11L17 8.5L1 1Z"
        fill="white"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * MouseSelectHighlight
 * 마우스 커서가 날아와 텍스트를 드래그 선택하는 무한 반복 애니메이션
 */
function MouseSelectHighlight({ children }) {
  const containerRef = useRef(null);
  const [cw, setCw] = useState(0);          // container width (px)
  const cursorCtrl = useAnimation();
  const selectCtrl = useAnimation();
  const alive = useRef(true);

  /* 컨테이너 너비 측정 */
  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setCw(containerRef.current.getBoundingClientRect().width);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* 애니메이션 시퀀스 */
  useEffect(() => {
    if (!cw) return;
    alive.current = true;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      while (alive.current) {
        /* ① 초기화 - 커서는 오른쪽 상단 밖에서 투명하게 */
        cursorCtrl.set({ x: cw * 0.7, y: -30, opacity: 0, scale: 1 });
        selectCtrl.set({ scaleX: 0, opacity: 0 });

        /* ② 커서 등장 */
        await cursorCtrl.start({ opacity: 1, transition: { duration: 0.25 } });
        if (!alive.current) break;

        /* ③ 이름 왼쪽 끝으로 이동 */
        await cursorCtrl.start({
          x: 0,
          y: 8,
          transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
        });
        if (!alive.current) break;

        /* ④ 클릭 느낌 (눌림) */
        await cursorCtrl.start({ scale: 0.8, transition: { duration: 0.1 } });
        await cursorCtrl.start({ scale: 1, transition: { duration: 0.08 } });
        if (!alive.current) break;

        /* ⑤ 드래그: 커서 오른쪽 끝으로 + 셀렉션 펼쳐짐 */
        await Promise.all([
          cursorCtrl.start({
            x: cw,
            y: 8,
            transition: { duration: 0.85, ease: 'easeOut' },
          }),
          selectCtrl.start({
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.85, ease: 'easeOut' },
          }),
        ]);
        if (!alive.current) break;

        /* ⑥ 잠시 유지 */
        await sleep(850);
        if (!alive.current) break;

        /* ⑦ 커서 위로 빠짐 + 셀렉션 페이드아웃 */
        await Promise.all([
          cursorCtrl.start({ y: -35, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }),
          selectCtrl.start({ opacity: 0, transition: { duration: 0.35 } }),
        ]);
        if (!alive.current) break;

        /* ⑧ 다음 루프 전 대기 */
        await sleep(700);
      }
    };

    run();
    return () => { alive.current = false; };
  }, [cw, cursorCtrl, selectCtrl]);

  return (
    <span
      ref={containerRef}
      className="relative inline-block cursor-default select-none"
    >
      {/* 텍스트 셀렉션 하이라이트 (왼→오 확장) */}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 right-0 rounded-sm bg-[#6AA8D4]/30 pointer-events-none z-10"
        animate={selectCtrl}
        style={{ originX: 0 }}
      />

      {/* 마우스 커서 */}
      <motion.span
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none z-30 drop-shadow-sm"
        animate={cursorCtrl}
      >
        <CursorIcon />
      </motion.span>

      {/* 실제 텍스트 */}
      <span className="relative z-20">{children}</span>
    </span>
  );
}

/** 섹션 전체 마우스 스포트라이트 */
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
            Product Designer
          </p>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <MouseSelectHighlight>
              <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
                EUNJU LEE
              </span>
            </MouseSelectHighlight>
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
