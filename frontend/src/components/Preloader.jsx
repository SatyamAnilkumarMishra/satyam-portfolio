import React, { useEffect, useRef, useState } from 'react';

const Preloader = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [activeTower, setActiveTower] = useState(0);
  const [nodePos, setNodePos] = useState({ x: -45, y: -38 });
  const [nodeScale, setNodeScale] = useState({ sx: 1, sy: 1 });
  const [completed, setCompleted] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [finished, setFinished] = useState(false);

  // Capital letters loading sequence
  const loadingDots = ['LOADING', 'LOADING.', 'LOADING..', 'LOADING...'];

  // Tower configs: X positions & Y top landing heights
  const towers = [
    { id: 0, x: -45, height: 24, topY: -28 },
    { id: 1, x: -15, height: 42, topY: -46 },
    { id: 2, x: 15, height: 60, topY: -64 },
    { id: 3, x: 45, height: 80, topY: -84 }
  ];

  // 10-Second Progress & FAST Loading Text Timer (200ms dot cycle)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 10000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(progressInterval);
        setCompleted(true);
        setActiveTower(-1);
        setRippleActive(true);
        
        setTimeout(() => {
          setFinished(true);
          onFinish && onFinish();
        }, 900);
      }
    }, 16);

    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingDots.length);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onFinish]);

  // FAST Data Node Curved Arc Jump Animation Loop (Speed boosted)
  useEffect(() => {
    let animFrame;
    let step = 0;
    let jumpProgress = 0;
    let pauseTimer = 0;

    const animateJump = () => {
      if (completed) return;

      if (pauseTimer > 0) {
        pauseTimer -= 16;
        animFrame = requestAnimationFrame(animateJump);
        return;
      }

      // Fast jump speed along parabolic arc
      jumpProgress += 0.09;

      if (jumpProgress >= 1) {
        jumpProgress = 0;
        setActiveTower(step);

        setNodeScale({ sx: 1.3, sy: 0.7 });
        setTimeout(() => setNodeScale({ sx: 1, sy: 1 }), 80);

        if (step === 3) {
          pauseTimer = 80; // Fast pause on Tower 4
          step = 0;
        } else {
          step++;
        }
      }

      const fromTower = towers[step === 0 ? 3 : step - 1];
      const toTower = towers[step];

      const x = fromTower.x + (toTower.x - fromTower.x) * jumpProgress;
      const linearY = fromTower.topY + (toTower.topY - fromTower.topY) * jumpProgress;
      const arcHeight = 22 * Math.sin(jumpProgress * Math.PI);
      const y = linearY - arcHeight;

      if (jumpProgress > 0.1 && jumpProgress < 0.9) {
        setNodeScale({ sx: 0.85, sy: 1.25 });
      }

      setNodePos({ x, y });
      animFrame = requestAnimationFrame(animateJump);
    };

    animFrame = requestAnimationFrame(animateJump);
    return () => cancelAnimationFrame(animFrame);
  }, [completed]);

  // HIGH-SPEED AI Matrix Encrypted Stream Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEF';
    const generatePacket = () => {
      const len = Math.floor(Math.random() * 16) + 8;
      let str = '';
      for (let i = 0; i < len; i++) {
        str += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      return str;
    };

    const createStreams = (count, layerType) => {
      const streams = [];
      const colWidth = displayWidth / count;
      for (let i = 0; i < count; i++) {
        streams.push({
          x: i * colWidth + Math.random() * (colWidth * 0.7),
          y: Math.random() * -displayHeight * 1.5,
          speed: layerType === 'bg' 
            ? Math.random() * 3.5 + 3.0 
            : layerType === 'mg' 
            ? Math.random() * 7.5 + 6.0 
            : Math.random() * 14.0 + 11.0,
          text: generatePacket(),
          fontSize: layerType === 'bg' ? 11 : layerType === 'mg' ? 14 : 17,
          opacity: layerType === 'bg' ? 0.35 : layerType === 'mg' ? 0.68 : 0.95,
          color: layerType === 'fg' 
            ? (Math.random() < 0.6 ? '#4FD1FF' : '#4F8CFF') 
            : layerType === 'mg' 
            ? (Math.random() < 0.7 ? '#4F8CFF' : '#8B5CF6') 
            : '#94A3B8',
          glow: layerType === 'fg' || layerType === 'mg',
          flickerRate: Math.random() * 0.35 + 0.15
        });
      }
      return streams;
    };

    let bgStreams = createStreams(60, 'bg');
    let mgStreams = createStreams(45, 'mg');
    let fgStreams = createStreams(35, 'fg');
    let allStreams = [...bgStreams, ...mgStreams, ...fgStreams];

    const handleResize = () => {
      displayWidth = window.innerWidth;
      displayHeight = window.innerHeight;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const boxSize = 260 * dpr;
      const boxX = (canvas.width - boxSize) / 2;
      const boxY = (canvas.height - boxSize) / 2;
      const boxRadius = 24 * dpr;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.roundRect(boxX, boxY, boxSize, boxSize, boxRadius);
      ctx.clip('evenodd');

      for (let s of allStreams) {
        s.y += s.speed * (completed ? 4.5 : 1);

        if (Math.random() < s.flickerRate) {
          s.text = generatePacket();
        }

        if (s.y > displayHeight + 120) {
          s.y = Math.random() * -180 - 60;
          s.x = Math.random() * displayWidth;
          s.text = generatePacket();
        }

        ctx.font = `${s.fontSize * dpr}px "JetBrains Mono", monospace`;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.opacity * (completed ? 0.3 : 1);

        if (s.glow) {
          ctx.shadowBlur = (s.fontSize > 15 ? 14 : 8) * dpr;
          ctx.shadowColor = s.color;
        } else {
          ctx.shadowBlur = 0;
        }

        const chars = s.text.split('');
        chars.forEach((ch, idx) => {
          const charY = (s.y + idx * (s.fontSize + 3)) * dpr;
          if (charY > 0 && charY < displayHeight * dpr + 60) {
            if (idx === chars.length - 1) {
              ctx.fillStyle = '#FFFFFF';
              ctx.shadowColor = '#FFFFFF';
              ctx.shadowBlur = 16 * dpr;
            } else {
              ctx.fillStyle = s.color;
              ctx.shadowColor = s.color;
            }
            ctx.fillText(ch, s.x * dpr, charY);
          }
        });

        ctx.globalAlpha = 1;
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [completed]);

  if (finished) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #030712 0%, #0b0f19 50%, #0f172a 100%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'none',
        opacity: completed ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Soft Radial Ambient Blue Glow on Right Side */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 209, 255, 0.16) 0%, rgba(99, 102, 241, 0.1) 45%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* High-Speed Encrypted AI Matrix Stream Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 2,
          filter: completed ? 'blur(12px) brightness(1.8)' : 'none',
          transition: 'filter 0.8s ease-in-out'
        }}
      />

      {/* FUTURISTIC 260px x 260px GLASS VIEWPORT SHIELD */}
      <div
        style={{
          position: 'relative',
          width: '260px',
          height: '260px',
          borderRadius: '24px',
          background: 'rgba(11, 15, 25, 0.55)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(79, 209, 255, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(79, 209, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          overflow: 'hidden'
        }}
      >
        {/* Subtle Fresnel Highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(79, 209, 255, 0.04) 40%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />

        {/* Centerpiece Container: 4 Network Signal Bars + Fast Jumping Data Node */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: '120px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginBottom: '1.2rem',
            zIndex: 5
          }}
        >
          {/* Expanding Ripple Ring on Completion */}
          {rippleActive && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '2px solid #4FD1FF',
                boxShadow: '0 0 35px #4FD1FF',
                animation: 'expandRipple 0.8s ease-out forwards'
              }}
            />
          )}

          {/* Fast Animated Circular Data Node */}
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              left: '50%',
              transform: `translate(${nodePos.x}px, ${nodePos.y}px) scale(${nodeScale.sx}, ${nodeScale.sy})`,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 18px #4FD1FF, 0 0 35px #FFFFFF',
              transition: 'transform 0.02s linear',
              zIndex: 10
            }}
          />

          {/* 4 Network Signal Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', position: 'relative' }}>
            {towers.map((t) => {
              const isLit = activeTower === -1 || activeTower === t.id;
              return (
                <div
                  key={t.id}
                  style={{
                    width: '16px',
                    height: `${t.height}px`,
                    borderRadius: '8px',
                    background: isLit
                      ? 'linear-gradient(180deg, #4FD1FF 0%, #4F8CFF 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: isLit
                      ? '1px solid rgba(79, 209, 255, 0.8)'
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isLit
                      ? '0 0 25px rgba(79, 209, 255, 0.7)'
                      : 'none',
                    transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    backdropFilter: 'blur(12px)'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* FAST CAPITAL LETTERS LOADING TEXT */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#F5F7FF',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}
        >
          <span>{loadingDots[loadingTextIndex]}</span>
        </div>
      </div>

      {/* STRICT UI REQUIREMENT: 2px Minimalist Progress Line at Bottom Edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          zIndex: 99999,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #4F8CFF 0%, #4FD1FF 55%, #FFFFFF 100%)',
            boxShadow: '0 0 14px #4FD1FF, 0 -2px 10px #FFFFFF',
            transition: 'width 0.016s linear'
          }}
        />
      </div>

      <style>{`
        @keyframes expandRipple {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
