import React, { useEffect, useRef } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(65, Math.floor(width / 20));

    const mouse = { x: -9999, y: -9999, radius: 120 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.radius = Math.random() * 1.8 + 0.6;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = -(Math.random() * 0.6 + 0.2);
        this.alpha = Math.random() * 0.5 + 0.15;
        this.baseAlpha = this.alpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x !== -9999) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
            this.alpha = Math.min(0.8, this.baseAlpha + force * 0.4);
          } else if (this.alpha > this.baseAlpha) {
            this.alpha -= 0.01;
          }
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
          this.y = height + 10;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent-primary').trim() || '#6366f1';
        ctx.fillStyle = accent;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas id="particles-canvas" ref={canvasRef} />
      <div className="background-glows">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
      </div>
    </>
  );
};

export default ParticleCanvas;
