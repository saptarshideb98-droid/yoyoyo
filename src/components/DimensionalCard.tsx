import React, { useRef, useState } from 'react';

interface DimensionalCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  glowColor?: 'cyan' | 'emerald' | 'blue';
  as?: 'div' | 'article' | 'section';
}

export const DimensionalCard: React.FC<DimensionalCardProps> = ({
  children,
  className = '',
  enableTilt = true,
  glowColor = 'cyan',
  as: Component = 'div',
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spotlight, setSpotlight] = useState<{
    x: number;
    y: number;
    opacity: number;
    rotateX: number;
    rotateY: number;
  }>({
    x: 50,
    y: 50,
    opacity: 0,
    rotateX: 0,
    rotateY: 0,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.pointerType === 'touch') return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (relX / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (relY / rect.height) * 100));

    const rotateY = enableTilt ? ((pctX - 50) / 50) * 2.2 : 0;
    const rotateX = enableTilt ? ((50 - pctY) / 50) * 2.2 : 0;

    setSpotlight({
      x: pctX,
      y: pctY,
      opacity: 1,
      rotateX,
      rotateY,
    });
  };

  const handlePointerLeave = () => {
    setSpotlight((prev) => ({
      ...prev,
      opacity: 0,
      rotateX: 0,
      rotateY: 0,
    }));
  };

  const glowRgba =
    glowColor === 'emerald'
      ? 'rgba(16, 185, 129, 0.13)'
      : glowColor === 'blue'
      ? 'rgba(56, 189, 248, 0.14)'
      : 'rgba(6, 182, 212, 0.14)';

  return (
    <Component
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          spotlight.opacity > 0 && enableTilt
            ? `perspective(1100px) rotateX(${spotlight.rotateX.toFixed(
                2
              )}deg) rotateY(${spotlight.rotateY.toFixed(
                2
              )}deg) translateZ(0)`
            : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)',
      }}
      className={`relative overflow-hidden transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {/* Mouse-responsive radial illumination layer */}
      <div
        aria-hidden="true"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(480px circle at ${spotlight.x}% ${spotlight.y}%, ${glowRgba}, transparent 70%)`,
        }}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      />
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};
