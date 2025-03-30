import React, { useEffect, useRef } from "react";

const HeroBackground = () => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const activeNodes = useRef(new Set());
  const ripples = useRef([]);
  const dataFlows = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Neuronal nodes with different sizes to simulate 3D network architecture
    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.8),
      targetX: 0,
      targetY: 0,
      radius: Math.random() * 2 + 1,
      baseRadius: Math.random() * 2 + 1,
      layerDepth: Math.floor(Math.random() * 3), // 0, 1, 2 for input, hidden, output layer simulation
      vx: 0,
      vy: 0,
      lastTargetUpdate: 0,
      targetUpdateDelay: Math.random() * 6000 + 2000,
      pulsePhase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.25 + 0.35,
      connections: [], // Will store connections to other nodes
      isActive: Math.random() > 0.7, // Some nodes start active
    }));

    // Initialize target positions
    nodes.forEach((node) => {
      node.targetX = node.x;
      node.targetY = node.y;
    });

    // Calculate connections between nodes (simulate neural network architecture)
    nodes.forEach((node) => {
      nodes.forEach((otherNode) => {
        if (
          node !== otherNode &&
          otherNode.layerDepth > node.layerDepth &&
          Math.random() > 0.6
        ) {
          node.connections.push(otherNode);
        }
      });
    });

    const createDataFlow = (startNode, endNode) => {
      if (!startNode || !endNode) return;

      dataFlows.current.push({
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        speed: Math.random() * 0.01 + 0.005,
        color: Math.random() > 0.5 ? "#60a5fa" : "#818cf8", // blue or indigo
        size: Math.random() * 1.5 + 1,
      });
    };

    const createRipple = (x, y) => {
      ripples.current.push({
        x,
        y,
        radius: 0,
        maxRadius: 40,
        opacity: 0.3,
        growth: 1.5,
      });
    };

    let scrollPosition = 0;
    const handleScroll = () => {
      scrollPosition = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    // Occasionally activate random nodes to simulate neural network activity
    const activateRandomNodes = () => {
      if (Math.random() > 0.7) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        randomNode.isActive = true;

        // Create ripple at newly activated node
        createRipple(randomNode.x, randomNode.y);

        // Trigger data flow along connections
        if (randomNode.connections.length > 0) {
          const targetNode =
            randomNode.connections[
              Math.floor(Math.random() * randomNode.connections.length)
            ];
          createDataFlow(randomNode, targetNode);
        }

        // Deactivate after some time
        setTimeout(() => {
          randomNode.isActive = Math.random() > 0.9; // Small chance to stay active
        }, Math.random() * 3000 + 1000);
      }

      setTimeout(activateRandomNodes, Math.random() * 600 + 200);
    };

    activateRandomNodes(); // Start the activation cycle

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate fade based on scroll position
      const fadeStart = window.innerHeight * 0.5;
      const fadeEnd = window.innerHeight * 0.7;
      const fadeAmount = Math.max(
        0,
        Math.min(1, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart))
      );

      // Update and draw ripples
      ripples.current = ripples.current.filter((ripple) => {
        ripple.radius += ripple.growth;
        ripple.opacity *= 0.96;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96, 165, 250, ${ripple.opacity * fadeAmount})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        return ripple.opacity > 0.01 && ripple.radius < ripple.maxRadius;
      });

      // Update and draw data flows
      dataFlows.current = dataFlows.current.filter((flow) => {
        flow.progress += flow.speed;

        if (flow.progress > 1) return false;

        const currentX =
          flow.startX + (flow.endX - flow.startX) * flow.progress;
        const currentY =
          flow.startY + (flow.endY - flow.startY) * flow.progress;

        // Draw data packet
        ctx.beginPath();
        ctx.arc(currentX, currentY, flow.size, 0, Math.PI * 2);
        ctx.fillStyle = `${flow.color}${Math.floor(fadeAmount * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();

        // Draw trail
        ctx.beginPath();
        ctx.strokeStyle = `${flow.color}40`; // 25% opacity
        ctx.lineWidth = flow.size * 0.7;
        ctx.moveTo(flow.startX, flow.startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        return true;
      });

      // Draw connections first (to appear behind nodes)
      nodes.forEach((node) => {
        node.connections.forEach((connectedNode) => {
          const dx = connectedNode.x - node.x;
          const dy = connectedNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only draw if within reasonable distance
          if (distance < 250) {
            // Adjust opacity based on whether nodes are active
            let opacity = 0.06;
            if (node.isActive && connectedNode.isActive) {
              opacity = 0.3;
            } else if (node.isActive || connectedNode.isActive) {
              opacity = 0.15;
            }

            // Draw synaptic connection
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity * fadeAmount})`; // Indigo
            ctx.lineWidth = 0.6;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();

            // Add subtle pulse effect along connections for active nodes
            if (node.isActive || connectedNode.isActive) {
              const gradient = ctx.createLinearGradient(
                node.x,
                node.y,
                connectedNode.x,
                connectedNode.y
              );
              gradient.addColorStop(0, "rgba(96, 165, 250, 0)");
              gradient.addColorStop(
                0.5,
                `rgba(96, 165, 250, ${0.2 * fadeAmount})`
              );
              gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1.5;
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(connectedNode.x, connectedNode.y);
              ctx.stroke();
            }
          }
        });
      });

      nodes.forEach((node) => {
        // Update target less frequently
        if (timestamp - node.lastTargetUpdate > node.targetUpdateDelay) {
          node.targetX = Math.random() * canvas.width;
          node.targetY = Math.random() * (canvas.height * 0.8);
          node.lastTargetUpdate = timestamp;
          node.targetUpdateDelay = Math.random() * 6000 + 2000;
        }

        // Very gradual movement towards target
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        node.vx = dx * 0.004;
        node.vy = dy * 0.004;

        node.x += node.vx;
        node.y += node.vy;

        // Mouse interaction - attract towards mouse
        const mouseDx = mousePosition.current.x - node.x;
        const mouseDy = mousePosition.current.y + scrollPosition - node.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < 180 && mouseDistance > 30) {
          // Subtle attraction to mouse for "activation" effect
          const angle = Math.atan2(mouseDy, mouseDx);
          const force = Math.min(0.3, (180 - mouseDistance) / 1800);
          node.vx += Math.cos(angle) * force;
          node.vy += Math.sin(angle) * force;

          // Activate nodes near mouse
          if (mouseDistance < 100 && !node.isActive && Math.random() > 0.97) {
            node.isActive = true;
            createRipple(node.x, node.y);

            // Possibility to create data flow
            if (node.connections.length > 0 && Math.random() > 0.5) {
              const targetNode =
                node.connections[
                  Math.floor(Math.random() * node.connections.length)
                ];
              createDataFlow(node, targetNode);
            }
          }
        }

        // Draw node with appropriate glow
        const pulse = Math.sin(timestamp * 0.001 + node.pulsePhase) * 0.3;
        const currentRadius =
          node.baseRadius * (node.isActive ? 1.3 : 1) + pulse;

        // Node glow - brighter for active nodes
        const glowRadius = node.isActive
          ? currentRadius * 6
          : currentRadius * 3;
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );

        if (node.isActive) {
          // Active node (brighter, with blue-purple glow)
          gradient.addColorStop(0, `rgba(106, 175, 255, ${0.4 * fadeAmount})`);
          gradient.addColorStop(1, "rgba(129, 140, 248, 0)");
        } else {
          // Inactive node (dimmer, blue glow)
          gradient.addColorStop(0, `rgba(96, 165, 250, ${0.2 * fadeAmount})`);
          gradient.addColorStop(1, "rgba(96, 165, 250, 0)");
        }

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node center - brighter for active nodes
        ctx.beginPath();
        ctx.fillStyle = node.isActive
          ? `rgba(139, 188, 255, ${0.8 * fadeAmount})`
          : `rgba(96, 165, 250, ${0.5 * fadeAmount})`;
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate(0);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* ML themed radial gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.06) 0%, rgba(59, 130, 246, 0.04) 25%, rgba(0, 0, 0, 1) 75%)",
          height: "100vh",
        }}
      />

      {/* Canvas */}
      <div className="fixed inset-0 w-full h-full z-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0.75,
            mixBlendMode: "plus-lighter",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* Code pattern overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Ctext x="10" y="15" font-family="monospace" font-size="10" fill="%235b91dd"%3E{x}%3C/text%3E%3Ctext x="30" y="35" font-family="monospace" font-size="10" fill="%235b91dd"%3E%3C/%3C/text%3E%3Ctext x="15" y="50" font-family="monospace" font-size="8" fill="%235b91dd"%3Edef%3C/text%3E%3C/svg%3E")',
          backgroundSize: "80px 80px",
          opacity: 0.03,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
    </>
  );
};

export default HeroBackground;
