/* =========================================================================
   matrix.js — original canvas "code rain" effect.
   Draws columns of falling green glyphs (katakana + digits + symbols).
   Exposes window.MatrixRain with start/stop; density adapts to screen size
   and throttles on small/reduced-motion devices.
   ========================================================================= */
(function () {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const GLYPHS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const FONT_SIZE = 11;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let columns = 0;
  let drops = [];
  let width = 0;
  let height = 0;
  let rafId = null;
  let lastFrame = 0;
  const frameInterval = 55; // ms between draws (~18fps, gentle + light on CPU)

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / FONT_SIZE);
    drops = new Array(columns).fill(0).map(() =>
      Math.floor((Math.random() * height) / FONT_SIZE)
    );
  }

  function draw(now) {
    rafId = requestAnimationFrame(draw);
    if (now - lastFrame < frameInterval) return;
    lastFrame = now;

    // translucent black fade => long dim trailing streams
    ctx.fillStyle = "rgba(0, 6, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    ctx.font = FONT_SIZE + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const ch = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      const x = i * FONT_SIZE;
      const y = drops[i] * FONT_SIZE;

      // occasional bright "head" glyph
      if (Math.random() > 0.975) {
        ctx.fillStyle = "#9fdfab";
      } else {
        ctx.fillStyle = "rgba(0, 255, 65, 0.75)";
      }
      ctx.fillText(ch, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const MatrixRain = {
    start() {
      if (rafId) return;
      resize();
      rafId = requestAnimationFrame(draw);
    },
    stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    },
  };

  window.addEventListener("resize", resize);

  // Auto-start. If the user prefers reduced motion, draw a single static frame.
  if (reduceMotion) {
    resize();
    ctx.fillStyle = "rgba(0,6,0,1)";
    ctx.fillRect(0, 0, width, height);
    ctx.font = FONT_SIZE + "px monospace";
    ctx.fillStyle = "#00ff41";
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < height / FONT_SIZE; j += 3) {
        if (Math.random() > 0.6) continue;
        ctx.fillText(
          GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length)),
          i * FONT_SIZE,
          j * FONT_SIZE
        );
      }
    }
  } else {
    MatrixRain.start();
  }

  window.MatrixRain = MatrixRain;
})();
