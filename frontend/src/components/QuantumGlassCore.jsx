import React, { useEffect, useRef } from 'react';

const QuantumGlassCore = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    let width = Math.min(window.innerWidth * 0.95, 1150);
    let height = Math.min(window.innerHeight * 0.95, 1150);

    const resizeCanvas = () => {
      width = Math.min(window.innerWidth * 0.95, 1150);
      height = Math.min(window.innerHeight * 0.95, 1150);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cube 3D Geometry Definition
    const rawVertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const faces = [
      [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
      [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
    ];

    // Multi-Cube Constellation Configuration (INCREASED Orbit Distances to 340px-380px)
    const cubes = [
      { id: 'main', scaleMult: 0.32, offsetX: 0, offsetY: 0, rotSpeed: 0.18, orbitAngle: 0, orbitDist: 0 },
      { id: 'sat1', scaleMult: 0.14, offsetX: 340, offsetY: -220, rotSpeed: -0.28, orbitAngle: 0.5, orbitDist: 350 },
      { id: 'sat2', scaleMult: 0.12, offsetX: -360, offsetY: 220, rotSpeed: 0.22, orbitAngle: 2.2, orbitDist: 380 },
      { id: 'sat3', scaleMult: 0.10, offsetX: -320, offsetY: -240, rotSpeed: -0.32, orbitAngle: 4.1, orbitDist: 340 }
    ];

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      targetMouseX = x * 0.18;
      targetMouseY = y * 0.18;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const startTime = Date.now();

    const rotateX = (v, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos];
    };

    const rotateY = (v, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0] * cos + v[2] * sin, v[1], -v[0] * sin + v[2] * cos];
    };

    const rotateZ = (v, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return [v[0] * cos - v[1] * sin, v[0] * sin + v[1] * cos, v[2]];
    };

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const projectedCubes = [];

      cubes.forEach((cubeConfig, cIdx) => {
        let curOffsetX = cubeConfig.offsetX;
        let curOffsetY = cubeConfig.offsetY;

        if (cubeConfig.orbitDist > 0) {
          const orbitTime = time * 0.22 + cubeConfig.orbitAngle;
          curOffsetX = Math.cos(orbitTime) * cubeConfig.orbitDist;
          curOffsetY = Math.sin(orbitTime) * (cubeConfig.orbitDist * 0.55) + Math.sin(time * 0.8 + cIdx) * 12;
        }

        const rotAngleY = time * cubeConfig.rotSpeed + currentMouseX;
        const rotAngleX = 0.55 + currentMouseY + Math.sin(time * 0.5 + cIdx) * 0.05;
        const rotAngleZ = 0.45 + Math.cos(time * 0.4 + cIdx) * 0.04;

        const floatY = Math.sin(time * 0.8 + cIdx) * 10;

        const cubeScale = Math.min(width, height) * cubeConfig.scaleMult;
        const originX = (width / 2 + curOffsetX) * dpr;
        const originY = (height / 2 + curOffsetY + floatY) * dpr;

        projectedCubes.push({ originX, originY });

        // Transform Vertices
        const projectedVertices = rawVertices.map((v) => {
          let p = rotateZ(v, rotAngleZ);
          p = rotateX(p, rotAngleX);
          p = rotateY(p, rotAngleY);

          const distance = 4;
          const fov = 350 * dpr;
          const perspective = fov / (distance - p[2]);

          return {
            x: originX + p[0] * cubeScale * (perspective / 300),
            y: originY + p[1] * cubeScale * (perspective / 300),
            z: p[2]
          };
        });

        // 1. Draw Glass Faces
        const sortedFaces = faces
          .map((face) => {
            const avgZ = face.reduce((sum, idx) => sum + projectedVertices[idx].z, 0) / 4;
            return { face, avgZ };
          })
          .sort((a, b) => a.avgZ - b.avgZ);

        for (let item of sortedFaces) {
          const f = item.face;
          ctx.beginPath();
          ctx.moveTo(projectedVertices[f[0]].x, projectedVertices[f[0]].y);
          ctx.lineTo(projectedVertices[f[1]].x, projectedVertices[f[1]].y);
          ctx.lineTo(projectedVertices[f[2]].x, projectedVertices[f[2]].y);
          ctx.lineTo(projectedVertices[f[3]].x, projectedVertices[f[3]].y);
          ctx.closePath();

          const glassGlow = ctx.createLinearGradient(
            projectedVertices[f[0]].x, projectedVertices[f[0]].y,
            projectedVertices[f[2]].x, projectedVertices[f[2]].y
          );
          glassGlow.addColorStop(0, 'rgba(79, 209, 255, 0.07)');
          glassGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)');
          glassGlow.addColorStop(1, 'rgba(255, 255, 255, 0.06)');

          ctx.fillStyle = glassGlow;
          ctx.fill();

          ctx.strokeStyle = 'rgba(79, 209, 255, 0.12)';
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();
        }

        // 2. Center Energy Orb
        const orbPulse = Math.sin(time * 2 + cIdx) * 3 + (cIdx === 0 ? 15 : 7);
        ctx.beginPath();
        ctx.arc(originX, originY, orbPulse * dpr, 0, Math.PI * 2);
        const orbGlow = ctx.createRadialGradient(originX, originY, 0, originX, originY, orbPulse * 2.8 * dpr);
        orbGlow.addColorStop(0, '#FFFFFF');
        orbGlow.addColorStop(0.3, '#4FD1FF');
        orbGlow.addColorStop(0.7, 'rgba(79, 140, 255, 0.35)');
        orbGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = orbGlow;
        ctx.shadowBlur = (cIdx === 0 ? 30 : 15) * dpr;
        ctx.shadowColor = '#4FD1FF';
        ctx.fill();

        // 3. Wireframe Edges
        for (let edge of edges) {
          const v1 = projectedVertices[edge[0]];
          const v2 = projectedVertices[edge[1]];

          const edgeGradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
          edgeGradient.addColorStop(0, '#4F8CFF');
          edgeGradient.addColorStop(0.5, '#4FD1FF');
          edgeGradient.addColorStop(1, '#FFFFFF');

          ctx.beginPath();
          ctx.moveTo(v1.x, v1.y);
          ctx.lineTo(v2.x, v2.y);
          ctx.strokeStyle = edgeGradient;
          ctx.lineWidth = (cIdx === 0 ? 2.0 : 1.2) * dpr;
          ctx.shadowBlur = (cIdx === 0 ? 12 : 6) * dpr;
          ctx.shadowColor = '#4FD1FF';
          ctx.stroke();
        }

        // 4. Corner Nodes
        for (let v of projectedVertices) {
          const nodePulse = Math.sin(time * 3 + v.z) * 0.8 + (cIdx === 0 ? 5.5 : 3.2);
          ctx.beginPath();
          ctx.arc(v.x, v.y, nodePulse * dpr, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 15 * dpr;
          ctx.shadowColor = '#4FD1FF';
          ctx.fill();
        }
      });

      // Draw Inter-Core Quantum Energy Beams
      const mainPos = projectedCubes[0];
      for (let i = 1; i < projectedCubes.length; i++) {
        const satPos = projectedCubes[i];
        ctx.beginPath();
        ctx.moveTo(mainPos.originX, mainPos.originY);
        ctx.lineTo(satPos.originX, satPos.originY);
        ctx.strokeStyle = 'rgba(79, 209, 255, 0.18)';
        ctx.lineWidth = 1 * dpr;
        ctx.setLineDash([4 * dpr, 8 * dpr]);
        ctx.shadowBlur = 10 * dpr;
        ctx.shadowColor = '#4FD1FF';
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1100px',
        height: '1100px',
        maxWidth: '98vw',
        maxHeight: '98vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default QuantumGlassCore;
