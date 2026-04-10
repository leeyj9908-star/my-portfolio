import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

function Globe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.4, 0.7, 1],
      glowColor: [0.2, 0.5, 0.9],
      markers: [
        { location: [37.5665, 126.978], size: 0.06 },  // Seoul
        { location: [40.7128, -74.006], size: 0.08 },  // New York (School of Visual Arts)
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.004;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[500px] aspect-square opacity-80"
    />
  );
}

export default Globe;
