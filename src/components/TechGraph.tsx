"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { prefersReducedMotion } from "@/lib/animations";

interface Node {
  id: string;
  label: string;
  category?: string;
  isRoot?: boolean;
  isHub?: boolean;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  angle: number;
  dist: number;
  subAngle?: number;
  subDist?: number;
}

interface Edge {
  from: string;
  to: string;
  highlighted?: boolean;
}

interface Pulse {
  edgeIdx: number;
  progress: number;
  speed: number;
}

export function TechGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const hoveredNodeRef = useRef<Node | null>(null);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = Math.max(560, Math.min(680, window.innerHeight * 0.75)));
    let cx = width / 2;
    let cy = height / 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Build graph structure from portfolioData
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Root node (EM Monogram)
    nodes.push({
      id: "root",
      label: "EM",
      isRoot: true,
      x: cx,
      y: cy,
      targetX: cx,
      targetY: cy,
      vx: 0,
      vy: 0,
      radius: 26,
      color: "#38bdf8",
      angle: 0,
      dist: 0,
    });

    // Category Hubs
    const hubs = [
      { id: "FRONTEND", label: "FRONTEND", angle: -Math.PI / 2.3, dist: 135, items: ["React", "Next.js", "Tailwind CSS", "HTML5/SCSS"] },
      { id: "LANGUAGES", label: "LANGUAGES", angle: -Math.PI / 6, dist: 165, items: ["Python", "TypeScript", "JavaScript", "C++", "SQL"] },
      { id: "BACKEND", label: "BACKEND", angle: Math.PI / 6, dist: 155, items: ["Node.js", "Express.js", "Django", "REST APIs"] },
      { id: "DATABASE", label: "DATABASE", angle: Math.PI / 2.1, dist: 150, items: ["MongoDB", "PostgreSQL", "MySQL"] },
      { id: "AI_GENAI", label: "AI / GENAI", angle: Math.PI * 0.82, dist: 165, items: ["Gemini AI", "Claude API", "VAPI Voice", "LangChain"] },
      { id: "INFRA", label: "INFRA", angle: -Math.PI * 0.85, dist: 150, items: ["Docker", "Vercel", "GitHub Actions", "Render"] },
      { id: "TOOLS", label: "TOOLS", angle: -Math.PI * 0.62, dist: 140, items: ["VS Code", "Git", "Postman", "Figma"] },
    ];

    hubs.forEach((hub) => {
      const hubX = cx + Math.cos(hub.angle) * hub.dist;
      const hubY = cy + Math.sin(hub.angle) * hub.dist;

      nodes.push({
        id: hub.id,
        label: hub.label,
        isHub: true,
        category: hub.id,
        x: hubX,
        y: hubY,
        targetX: hubX,
        targetY: hubY,
        vx: 0,
        vy: 0,
        radius: 12,
        color: "#60a5fa",
        angle: hub.angle,
        dist: hub.dist,
      });

      edges.push({ from: "root", to: hub.id });

      // Sub-nodes
      const count = hub.items.length;
      hub.items.forEach((item, idx) => {
        const spread = 0.55;
        const subAngle = hub.angle + (idx - (count - 1) / 2) * (spread / Math.max(1, count - 1));
        const subDist = hub.dist + 68 + (idx % 2) * 22;
        const subX = cx + Math.cos(subAngle) * subDist;
        const subY = cy + Math.sin(subAngle) * subDist;

        nodes.push({
          id: `${hub.id}_${item}`,
          label: item,
          category: hub.id,
          x: subX,
          y: subY,
          targetX: subX,
          targetY: subY,
          vx: 0,
          vy: 0,
          radius: 6,
          color: "#94a3b8",
          angle: subAngle,
          dist: subDist,
        });

        edges.push({ from: hub.id, to: `${hub.id}_${item}` });
      });
    });

    // Pulses traveling along lines
    const pulses: Pulse[] = [];
    for (let i = 0; i < 14; i++) {
      pulses.push({
        edgeIdx: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
      });
    }

    // Drag / hover state
    let draggedNode: Node | null = null;
    let mouseX = -1000;
    let mouseY = -1000;

    const getConnectedNodeIds = (targetNode: Node | null): Set<string> => {
      const set = new Set<string>();
      if (!targetNode) return set;
      set.add(targetNode.id);

      if (targetNode.isRoot) {
        nodes.forEach((n) => set.add(n.id));
        return set;
      }

      // If leaf, highlight leaf, its hub, and root
      if (!targetNode.isHub) {
        if (targetNode.category) {
          set.add(targetNode.category);
        }
        set.add("root");
        return set;
      }

      // If hub, highlight root and all its children
      set.add("root");
      nodes.forEach((n) => {
        if (n.category === targetNode.id) set.add(n.id);
      });
      return set;
    };

    // Pointer events
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (draggedNode) {
        draggedNode.targetX = mouseX;
        draggedNode.targetY = mouseY;
        return;
      }

      // Detect hover
      let found: Node | null = null;
      for (const node of nodes) {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const hitRadius = Math.max(node.radius + 8, 20);
        if (dx * dx + dy * dy < hitRadius * hitRadius) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
    };

    const onPointerDown = () => {
      const h = hoveredNodeRef.current;
      if (h && !h.isRoot) {
        draggedNode = h;
      }
    };

    const onPointerUp = () => {
      draggedNode = null;
    };

    const onPointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      draggedNode = null;
      setHoveredNode(null);
    };

    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    canvas.addEventListener("mouseleave", onPointerLeave);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = Math.max(560, Math.min(680, window.innerHeight * 0.75));
      cx = width / 2;
      cy = height / 2;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Re-anchor root
      const root = nodes.find((n) => n.isRoot);
      if (root) {
        root.targetX = cx;
        root.targetY = cy;
      }

      // Re-anchor hubs and leaves with responsive scale factor
      const scale = width < 640 ? 0.7 : width < 1024 ? 0.88 : 1;
      nodes.forEach((n) => {
        if (!n.isRoot) {
          n.targetX = cx + Math.cos(n.angle) * n.dist * scale;
          n.targetY = cy + Math.sin(n.angle) * n.dist * scale;
        }
      });
    };

    window.addEventListener("resize", onResize);
    onResize();

    // Render loop
    let animId: number;
    let time = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      const activeSet = getConnectedNodeIds(hoveredNodeRef.current);
      const isHovering = hoveredNodeRef.current !== null;

      // Update node physics (smooth interpolation towards targets with gentle idle float)
      nodes.forEach((node, i) => {
        if (!prefersReducedMotion() && node !== draggedNode) {
          const sway = Math.sin(time * 0.8 + i * 0.4) * 3;
          const swayY = Math.cos(time * 0.7 + i * 0.5) * 3;
          node.x += (node.targetX + sway - node.x) * 0.08;
          node.y += (node.targetY + swayY - node.y) * 0.08;
        } else {
          node.x += (node.targetX - node.x) * 0.15;
          node.y += (node.targetY - node.y) * 0.15;
        }
      });

      // ── DRAW EDGES ──
      edges.forEach((edge, idx) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return;

        const isEdgeActive =
          activeSet.has(fromNode.id) && activeSet.has(toNode.id);

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        if (isEdgeActive) {
          ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 12;
        } else if (isHovering) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = "rgba(59, 130, 246, 0.22)";
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // ── DRAW SIGNAL PULSES ──
      if (!prefersReducedMotion()) {
        pulses.forEach((pulse) => {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            pulse.edgeIdx = Math.floor(Math.random() * edges.length);
          }

          const edge = edges[pulse.edgeIdx];
          if (!edge) return;
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return;

          const px = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = "#67e8f9";
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // ── DRAW NODES ──
      nodes.forEach((node) => {
        const isNodeActive = activeSet.has(node.id);
        const isDimmed = isHovering && !isNodeActive;

        ctx.save();
        ctx.translate(node.x, node.y);

        if (node.isRoot) {
          // Central Core Monogram Node (EM)
          // Outer ripple ring
          const ripple = (Math.sin(time * 2) + 1) * 3;
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 9 + ripple, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer glowing ring
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = isHovering ? "#38bdf8" : "rgba(56, 189, 248, 0.6)";
          ctx.lineWidth = 2;
          ctx.shadowColor = "#38bdf8";
          ctx.shadowBlur = 18;
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Inner solid core
          ctx.beginPath();
          ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#020617";
          ctx.fill();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Text inside core
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 13px ui-monospace, monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("EM", 0, 0);
        } else if (node.isHub) {
          // Category Hub Nodes (FRONTEND, BACKEND, etc.)
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = isNodeActive ? "#38bdf8" : "rgba(59, 130, 246, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = isNodeActive ? "#0284c7" : "#1e293b";
          if (isNodeActive) {
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 14;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Inner white dot
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Hub Label
          ctx.fillStyle = isNodeActive ? "#ffffff" : isDimmed ? "rgba(148, 163, 184, 0.3)" : "#94a3b8";
          ctx.font = `bold ${isNodeActive ? "11px" : "10px"} ui-monospace, monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, 0, node.radius + 7);
        } else {
          // Leaf skill nodes (React, Python, etc.)
          ctx.beginPath();
          ctx.arc(0, 0, isNodeActive ? node.radius + 2 : node.radius, 0, Math.PI * 2);
          ctx.fillStyle = isNodeActive ? "#ffffff" : isDimmed ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.75)";
          if (isNodeActive) {
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 12;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Leaf Label
          ctx.fillStyle = isNodeActive ? "#ffffff" : isDimmed ? "rgba(255, 255, 255, 0.2)" : "#cbd5e1";
          ctx.font = `${isNodeActive ? "bold 12px" : "11px"} -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.label, 0, node.radius + 5);
        }

        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      canvas.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-4 sm:p-8 backdrop-blur-xl select-none"
    >
      {/* Background radial gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, #1e3a8a 0%, transparent 70%)",
        }}
      />

      {/* Header controls & status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.25em] text-blue-400 block mb-1">
            // Neural Competency Constellation
          </span>
          <h3 className="text-xl sm:text-2xl font-bold uppercase font-mono text-white tracking-tight">
            Interactive Skills Network
          </h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Hover to isolate neural branch
          </span>
          <span className="text-[0.65rem] text-zinc-500 uppercase tracking-widest">
            30+ CORE TECHNOLOGIES
          </span>
        </div>
      </div>

      {/* Canvas stage */}
      <div className="relative flex items-center justify-center min-h-[540px] sm:min-h-[620px] cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Hover inspector tooltip */}
        {hoveredNode && (
          <div className="pointer-events-none absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-xl border border-blue-500/40 bg-zinc-950/90 px-4 py-2 font-mono text-xs text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-zinc-400 uppercase tracking-wider">Node:</span>
            <span className="font-bold text-blue-300">{hoveredNode.label}</span>
            {hoveredNode.category && (
              <span className="text-[0.65rem] text-zinc-500 uppercase">
                [{hoveredNode.category}]
              </span>
            )}
          </div>
        )}
      </div>

      {/* Quick category badges at bottom */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-white/5 font-mono text-[0.65rem] uppercase tracking-wider text-zinc-400">
        <span className="text-zinc-600 mr-2">DOMAINS:</span>
        {["FRONTEND", "LANGUAGES", "BACKEND", "DATABASE", "AI / GENAI", "INFRA", "TOOLS"].map((c) => (
          <span
            key={c}
            className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] text-zinc-300 hover:border-blue-400/50 hover:text-white transition-colors"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
