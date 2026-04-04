document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. Custom Cursor ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  
  // Only run cursor logic if the elements exist on the page
  if (cursor && ring) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      
      setTimeout(() => {
        ring.style.left = mouseX + 'px';
        ring.style.top = mouseY + 'px';
      }, 80);
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ring.style.borderColor = 'var(--tech-blue)';
        cursor.style.background = 'var(--tech-blue)';
        cursor.style.boxShadow = '0 0 10px var(--tech-blue)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'var(--nv-green)';
        cursor.style.background = 'var(--nv-green)';
        cursor.style.boxShadow = '0 0 10px var(--nv-green)';
      });
    });
  }

  // ── 2. Animated Neural Network BG ──
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    let nodes = [];
    const numNodes = 120;
    const connectionDist = 160;
    const colors = ['#76b900', '#00d1ff'];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function initNodes() {
      nodes = [];
      for(let i=0; i<numNodes; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.85 ? colors[1] : colors[0]
        });
      }
    }
    initNodes();

    // Fix for mouse interaction within the canvas
    let mouseNode = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    document.addEventListener('mousemove', e => {
      mouseNode.x = e.clientX;
      mouseNode.y = e.clientY;
    });

    function draw() {
      ctx.fillStyle = 'rgba(3, 5, 4, 1)';
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(118, 185, 0, 0.015)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 100) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 100) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      for(let i=0; i<nodes.length; i++) {
        for(let j=i+1; j<nodes.length; j++) {
          let dx = nodes[i].x - nodes[j].x;
          let dy = nodes[i].y - nodes[j].y;
          let dist = Math.sqrt(dx*dx + dy*dy);

          if(dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            let alpha = 1 - (dist/connectionDist);
            let isBlue = (nodes[i].color === colors[1] || nodes[j].color === colors[1]);
            let lineColor = isBlue ? `rgba(0, 209, 255, ${alpha * 0.3})` : `rgba(118, 185, 0, ${alpha * 0.25})`;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = alpha * 1.5;
            ctx.stroke();
          }
        }

        let mdx = nodes[i].x - mouseNode.x;
        let mdy = nodes[i].y - mouseNode.y;
        let mDist = Math.sqrt(mdx*mdx + mdy*mdy);
        if(mDist < connectionDist + 50) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouseNode.x, mouseNode.y);
          let mAlpha = 1 - (mDist/(connectionDist + 50));
          ctx.strokeStyle = `rgba(118, 185, 0, ${mAlpha * 0.4})`;
          ctx.lineWidth = mAlpha * 2;
          ctx.stroke();

          nodes[i].x -= mdx * 0.002;
          nodes[i].y -= mdy * 0.002;
        }
      }

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        if(n.x < -50 || n.x > W + 50) n.vx *= -1;
        if(n.y < -50 || n.y > H + 50) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ── 3. Scroll Reveal Animations ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) {
          e.target.classList.add('visible'); 
        }
      });
    }, { threshold: 0.12 });
    
    revealEls.forEach(el => obs.observe(el));
  }
});