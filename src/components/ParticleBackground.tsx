import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// ─── types ────────────────────────────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  radius: number;
  connections: number[];   // neighbour indices
  brightness: number;      // 0–1 glow intensity
  lastPulseAt: number;     // timestamp of last arriving pulse
}

interface Pulse {
  from: number;
  to: number;
  progress: number;        // 0–1 along the edge
  speed: number;
  color: string;
  alpha: number;
}

// ─── constants ────────────────────────────────────────────────────────────────
const NODE_COUNT       = 85;
const MAX_LINK_DIST    = 155;
const MAX_PULSES       = 45;
const PULSE_SPAWN_MS   = 280;
const MOUSE_GLOW_R     = 160;

const PULSE_COLORS     = ['#8B5CF6', '#A78BFA', '#059669', '#34D399', '#7C3AED'];

// ─── helpers ──────────────────────────────────────────────────────────────────
function makeNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x:           Math.random() * w,
    y:           Math.random() * h,
    radius:      1.4 + Math.random() * 1.8,
    connections: [],
    brightness:  0,
    lastPulseAt: 0,
  }));
}

function linkNodes(nodes: Node[]) {
  for (const n of nodes) n.connections = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < MAX_LINK_DIST) {
        nodes[i].connections.push(j);
        nodes[j].connections.push(i);
      }
    }
  }
}

function spawnFrom(nodeIdx: number, nodes: Node[], pulses: Pulse[]) {
  const node = nodes[nodeIdx];
  if (!node.connections.length) return;
  const toIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
  pulses.push({
    from:     nodeIdx,
    to:       toIdx,
    progress: 0,
    speed:    0.003 + Math.random() * 0.006,
    color:    PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)],
    alpha:    0.65 + Math.random() * 0.35,
  });
}

function closestNode(mx: number, my: number, nodes: Node[]): number {
  let minD = Infinity, idx = 0;
  for (let i = 0; i < nodes.length; i++) {
    const d = Math.hypot(nodes[i].x - mx, nodes[i].y - my);
    if (d < minD) { minD = d; idx = i; }
  }
  return minD < MOUSE_GLOW_R ? idx : -1;
}

// ─── component ────────────────────────────────────────────────────────────────
export function ParticleBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number } | null>(null);
  const reduce    = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    if (!ctx) return;

    let animId: number;
    let nodes:  Node[]  = [];
    let pulses: Pulse[] = [];
    let lastSpawn = 0;

    // ── pointer tracking ────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = null; };

    // click — burst of pulses from nearest node
    const onClick = (e: MouseEvent) => {
      const r   = canvas.getBoundingClientRect();
      const idx = closestNode(e.clientX - r.left, e.clientY - r.top, nodes);
      if (idx < 0) return;
      nodes[idx].brightness = 1;
      for (let i = 0; i < 4; i++) spawnFrom(idx, nodes, pulses);
    };

    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('click',      onClick);

    // ── resize ──────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes  = makeNodes(canvas.width, canvas.height);
      linkNodes(nodes);
      pulses = [];
      // seed initial pulses
      for (let i = 0; i < 18; i++)
        spawnFrom(Math.floor(Math.random() * nodes.length), nodes, pulses);
    };

    // ── draw loop ───────────────────────────────────────────────
    const draw = (ts: number) => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;

      // spawn new pulses on a timer
      if (ts - lastSpawn > PULSE_SPAWN_MS && pulses.length < MAX_PULSES) {
        spawnFrom(Math.floor(Math.random() * nodes.length), nodes, pulses);
        lastSpawn = ts;
      }

      // occasionally fire extra pulse from mouse-closest node
      if (mouse && Math.random() < 0.04) {
        const idx = closestNode(mouse.x, mouse.y, nodes);
        if (idx >= 0 && pulses.length < MAX_PULSES) spawnFrom(idx, nodes, pulses);
      }

      // ── 1. update node brightness ───────────────────────────
      for (const n of nodes) {
        // mouse proximity boost
        if (mouse) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          n.brightness = d < MOUSE_GLOW_R
            ? Math.min(1, n.brightness + 0.06)
            : Math.max(0, n.brightness - 0.015);
        } else {
          n.brightness = Math.max(0, n.brightness - 0.015);
        }
        // pulse-arrival fade
        const sincePulse = ts - n.lastPulseAt;
        const pf = Math.max(0, 1 - sincePulse / 900);
        n.brightness = Math.max(n.brightness, pf * 0.9);
      }

      // ── 2. draw edges ────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const j of a.connections) {
          if (j <= i) continue;
          const b   = nodes[j];
          const avg = (a.brightness + b.brightness) * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = '#8B5CF6';
          ctx.globalAlpha = 0.055 + avg * 0.18;
          ctx.lineWidth   = 0.65;
          ctx.stroke();
        }
      }

      // ── 3. advance & draw pulses ─────────────────────────────
      const alive: Pulse[] = [];
      for (const p of pulses) {
        p.progress += p.speed;

        if (p.progress >= 1) {
          // pulse arrived — light node, spawn continuation
          nodes[p.to].lastPulseAt = ts;
          nodes[p.to].brightness  = 1;
          if (Math.random() > 0.15 && pulses.length < MAX_PULSES)
            spawnFrom(p.to, nodes, pulses);
          continue;
        }
        alive.push(p);

        const fa = nodes[p.from];
        const fb = nodes[p.to];
        const px = fa.x + (fb.x - fa.x) * p.progress;
        const py = fa.y + (fb.y - fa.y) * p.progress;

        // soft outer glow
        const g1 = ctx.createRadialGradient(px, py, 0, px, py, 9);
        g1.addColorStop(0,   p.color + 'cc');
        g1.addColorStop(0.4, p.color + '55');
        g1.addColorStop(1,   p.color + '00');
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle   = g1;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // bright core dot
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle   = '#ffffff';
        ctx.globalAlpha = p.alpha * 0.9;
        ctx.fill();

        // trailing line segment (last 15% of edge traversed)
        if (p.progress > 0.15) {
          const tp = Math.max(0, p.progress - 0.15);
          ctx.beginPath();
          ctx.moveTo(fa.x + (fb.x - fa.x) * tp, fa.y + (fb.y - fa.y) * tp);
          ctx.lineTo(px, py);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.35;
          ctx.lineWidth   = 1.2;
          ctx.stroke();
        }
      }
      pulses = alive;

      // ── 4. draw nodes ────────────────────────────────────────
      for (const n of nodes) {
        const g = n.brightness;

        // halo glow when bright
        if (g > 0.08) {
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 5 + g * 10);
          halo.addColorStop(0, `rgba(139,92,246,${(g * 0.45).toFixed(2)})`);
          halo.addColorStop(1, 'rgba(139,92,246,0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 5 + g * 10, 0, Math.PI * 2);
          ctx.fillStyle   = halo;
          ctx.globalAlpha = 1;
          ctx.fill();
        }

        // node disc
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + g * 1.8, 0, Math.PI * 2);
        ctx.fillStyle   = g > 0.25 ? '#C4B5FD' : '#8B5CF640';
        ctx.globalAlpha = 0.25 + g * 0.75;
        ctx.fill();
      }

      // ── 5. cursor glow ───────────────────────────────────────
      if (mouse) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);
        cg.addColorStop(0, 'rgba(139,92,246,0.14)');
        cg.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2);
        ctx.fillStyle   = cg;
        ctx.globalAlpha = 1;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('mousemove',  onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('click',      onClick);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
