// Kucing oren: SVG + interaksi (mata ngikutin jari/kursor, tap = meong)
(function () {
  const OR = "#F59A3C";
  const OR_DARK = "#E07B24";
  const CREAM = "#FFE6CC";
  const INK = "#3B2416";
  const PINK = "#FF8FAB";

  const heartPath = (cx, cy, s) =>
    `M${cx} ${cy + 6 * s} C${cx - 9 * s} ${cy} ${cx - 8 * s} ${cy - 7 * s} ${cx - 3.5 * s} ${cy - 7 * s} ` +
    `C${cx - 1 * s} ${cy - 7 * s} ${cx} ${cy - 4.5 * s} ${cx} ${cy - 4.5 * s} ` +
    `C${cx} ${cy - 4.5 * s} ${cx + 1 * s} ${cy - 7 * s} ${cx + 3.5 * s} ${cy - 7 * s} ` +
    `C${cx + 8 * s} ${cy - 7 * s} ${cx + 9 * s} ${cy} ${cx} ${cy + 6 * s} Z`;

  const sparkle = (x, y, s, delay) =>
    `<path class="sparkle" style="animation-delay:${delay}s" d="M${x} ${y - 8 * s} Q${x + 1.5 * s} ${y - 1.5 * s} ${x + 8 * s} ${y} Q${x + 1.5 * s} ${y + 1.5 * s} ${x} ${y + 8 * s} Q${x - 1.5 * s} ${y + 1.5 * s} ${x - 8 * s} ${y} Q${x - 1.5 * s} ${y - 1.5 * s} ${x} ${y - 8 * s} Z" fill="#FFC93C"/>`;

  function ears(sad) {
    if (sad) {
      return `
        <g class="ear ear-l"><path d="M46 74 Q14 72 16 56 Q34 46 62 54 Z" fill="${OR}"/><path d="M44 68 Q26 66 25 59 Q36 54 52 58 Z" fill="${PINK}"/></g>
        <g class="ear ear-r"><path d="M154 74 Q186 72 184 56 Q166 46 138 54 Z" fill="${OR}"/><path d="M156 68 Q174 66 175 59 Q164 54 148 58 Z" fill="${PINK}"/></g>`;
    }
    return `
      <g class="ear ear-l"><path d="M42 80 Q36 30 56 24 Q72 34 88 52 Z" fill="${OR}"/><path d="M51 68 Q48 40 59 35 Q68 43 77 54 Z" fill="${PINK}"/></g>
      <g class="ear ear-r"><path d="M158 80 Q164 30 144 24 Q128 34 112 52 Z" fill="${OR}"/><path d="M149 68 Q152 40 141 35 Q132 43 123 54 Z" fill="${PINK}"/></g>`;
  }

  function eyes(mood) {
    if (mood === "happy") {
      return `
        <path d="M62 102 Q74 86 86 102" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M114 102 Q126 86 138 102" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    }
    if (mood === "love") {
      return `
        <path class="heart-eye" d="${heartPath(74, 100, 1.9)}" fill="#FF4D6D"/>
        <path class="heart-eye" d="${heartPath(126, 100, 1.9)}" fill="#FF4D6D"/>
        <circle cx="69" cy="91" r="2.5" fill="#fff"/><circle cx="121" cy="91" r="2.5" fill="#fff"/>`;
    }
    if (mood === "sad") {
      return `
        <path d="M60 86 Q72 82 86 76" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M140 86 Q128 82 114 76" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <g class="blink">
          <ellipse cx="74" cy="102" rx="14" ry="16" fill="${INK}"/>
          <ellipse cx="126" cy="102" rx="14" ry="16" fill="${INK}"/>
          <ellipse class="wet" cx="74" cy="111" rx="10" ry="4.5" fill="#8FD3FF" opacity=".85"/>
          <ellipse class="wet" cx="126" cy="111" rx="10" ry="4.5" fill="#8FD3FF" opacity=".85"/>
          <circle cx="79" cy="95" r="5.5" fill="#fff"/><circle cx="131" cy="95" r="5.5" fill="#fff"/>
          <circle cx="69" cy="104" r="2.5" fill="#fff"/><circle cx="121" cy="104" r="2.5" fill="#fff"/>
        </g>
        <path class="tear" d="M64 114 q-5 9 0 12 q5 -3 0 -12z" fill="#7EC8F2"/>
        <path class="tear t2" d="M136 114 q-5 9 0 12 q5 -3 0 -12z" fill="#7EC8F2"/>`;
    }
    // normal: mata bulat besar yang bisa ngikutin kursor
    return `
      <g class="blink">
        <ellipse cx="74" cy="100" rx="13" ry="15" fill="${INK}"/>
        <ellipse cx="126" cy="100" rx="13" ry="15" fill="${INK}"/>
        <g class="look">
          <circle cx="78" cy="94" r="5" fill="#fff"/><circle cx="130" cy="94" r="5" fill="#fff"/>
          <circle cx="70" cy="105" r="2.2" fill="#fff"/><circle cx="122" cy="105" r="2.2" fill="#fff"/>
        </g>
      </g>`;
  }

  function mouth(mood) {
    if (mood === "sad") {
      return `<path d="M88 132 Q94 126 100 130 Q106 126 112 132" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    if (mood === "happy" || mood === "love") {
      return `
        <path d="M86 122 Q100 146 114 122 Q100 128 86 122 Z" fill="#B23A48"/>
        <path d="M93 132 Q100 141 107 132 Q100 128 93 132 Z" fill="#FF7A93"/>
        <path d="M86 122 Q93 126 100 121 Q107 126 114 122" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    }
    return `<path d="M88 122 Q94 129 100 122 Q106 129 112 122" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  }

  function extras(mood) {
    if (mood === "happy") {
      return sparkle(24, 52, 1.1, 0) + sparkle(178, 44, 1.3, 0.4) + sparkle(18, 130, 0.8, 0.8) + sparkle(184, 138, 0.9, 1.2);
    }
    if (mood === "love") {
      return [
        [30, 70, 1.2, 0], [172, 60, 1.4, 0.7], [20, 120, 0.9, 1.3], [182, 118, 1, 1.9],
      ].map(([x, y, s, d]) => `<path class="float-heart" style="animation-delay:${d}s" d="${heartPath(x, y, s)}" fill="#FF6B8B"/>`).join("");
    }
    if (mood === "sad") {
      return `
        <g class="cloud">
          <g class="rain">
            <path d="M84 30 l-3 9 M100 32 l-3 9 M116 30 l-3 9" stroke="#8FB8E0" stroke-width="3" stroke-linecap="round"/>
          </g>
          <ellipse cx="100" cy="14" rx="30" ry="12" fill="#C9D3DD"/>
          <circle cx="84" cy="12" r="11" fill="#C9D3DD"/>
          <circle cx="104" cy="5" r="13" fill="#D5DEE7"/>
          <circle cx="120" cy="13" r="10" fill="#C9D3DD"/>
        </g>`;
    }
    return "";
  }

  function arms(mood) {
    // kaki depan / tangan
    if (mood === "normal") {
      return `
        <g class="wave">
          <path d="M138 158 Q152 140 160 124" stroke="${OR}" stroke-width="20" fill="none" stroke-linecap="round"/>
          <circle cx="161" cy="120" r="12" fill="${CREAM}"/>
          <circle cx="161" cy="123" r="4" fill="${PINK}"/>
          <circle cx="155" cy="115" r="2.2" fill="${PINK}"/><circle cx="161" cy="112" r="2.2" fill="${PINK}"/><circle cx="167" cy="115" r="2.2" fill="${PINK}"/>
        </g>`;
    }
    if (mood === "happy") {
      return `
        <g class="cheer cheer-l"><path d="M60 156 Q42 140 34 122" stroke="${OR}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="33" cy="118" r="11" fill="${CREAM}"/></g>
        <g class="cheer cheer-r"><path d="M140 156 Q158 140 166 122" stroke="${OR}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="167" cy="118" r="11" fill="${CREAM}"/></g>`;
    }
    if (mood === "love") {
      return `
        <path class="hug-heart" d="${heartPath(100, 170, 3.4)}" fill="#FF4D6D" stroke="#fff" stroke-width="3"/>
        <ellipse cx="78" cy="166" rx="12" ry="10" fill="${CREAM}"/>
        <ellipse cx="122" cy="166" rx="12" ry="10" fill="${CREAM}"/>`;
    }
    return "";
  }

  window.catSVG = function (mood) {
    const sad = mood === "sad";
    return `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="kucing oren">
  <ellipse class="shadow" cx="100" cy="194" rx="58" ry="6" fill="#E07B24" opacity=".15"/>
  <g class="tail"><path d="M142 172 Q188 168 182 124 Q180 108 168 112" stroke="${OR}" stroke-width="15" fill="none" stroke-linecap="round"/>
    <path d="M178 118 Q176 108 168 112" stroke="${OR_DARK}" stroke-width="15" fill="none" stroke-linecap="round"/></g>
  <g class="body">
    <ellipse cx="100" cy="164" rx="56" ry="30" fill="${OR}"/>
    <path d="M58 150 Q64 156 60 164 M142 150 Q136 156 140 164" stroke="${OR_DARK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="100" cy="170" rx="30" ry="20" fill="${CREAM}"/>
    <ellipse cx="78" cy="188" rx="15" ry="9" fill="${CREAM}"/>
    <ellipse cx="122" cy="188" rx="15" ry="9" fill="${CREAM}"/>
    <path d="M73 186 v5 M78 185 v6 M83 186 v5 M117 186 v5 M122 185 v6 M127 186 v5" stroke="#E8B48A" stroke-width="1.6" stroke-linecap="round"/>
  </g>
  <g class="head">
    ${ears(sad)}
    <path d="M34 106 C34 62 64 46 100 46 C136 46 166 62 166 106 C166 142 136 156 100 156 C64 156 34 142 34 106 Z" fill="${OR}"/>
    <path d="M38 118 L26 124 L40 128 Z M162 118 L174 124 L160 128 Z" fill="${OR}"/>
    <path d="M100 50 L100 68 M86 52 L90 66 M114 52 L110 66" stroke="${OR_DARK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M36 98 L50 100 M162 98 L150 100" stroke="${OR_DARK}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="100" cy="124" rx="28" ry="19" fill="${CREAM}"/>
    ${eyes(mood)}
    <ellipse class="blush" cx="56" cy="122" rx="10" ry="6.5" fill="${PINK}" opacity=".6"/>
    <ellipse class="blush" cx="144" cy="122" rx="10" ry="6.5" fill="${PINK}" opacity=".6"/>
    <path d="M94 112 Q100 108 106 112 Q100 119 94 112 Z" fill="#FF6F91"/>
    <g class="mouth-closed">${mouth(mood)}</g>
    <g class="mouth-open">
      <path d="M88 120 Q100 118 112 120 Q114 140 100 142 Q86 140 88 120 Z" fill="#8B2635" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <ellipse cx="100" cy="135" rx="7" ry="5" fill="#FF7A93"/>
    </g>
    <g class="whiskers whiskers-l"><path d="M52 116 L22 110 M52 122 L20 124 M54 128 L26 136" stroke="#C9772E" stroke-width="2.2" stroke-linecap="round"/></g>
    <g class="whiskers whiskers-r"><path d="M148 116 L178 110 M148 122 L180 124 M146 128 L174 136" stroke="#C9772E" stroke-width="2.2" stroke-linecap="round"/></g>
  </g>
  ${arms(mood)}
  ${extras(mood)}
</svg>`;
  };

  // ---------- Interaksi ----------
  const LINES = {
    normal: ["meow~ 😺", "purr purr...", "ajak aku jalan dong 🥺", "nyaa~", "hehe 🧡"],
    happy: ["yeay!! 🎉", "meow meow!", "asik jalan 😻", "nyaa~ 🧡"],
    love: ["luv u 💕", "purrrr 😽", "deal ya! 🐾"],
    sad: ["hiks... 😿", "...", "jahat 🥲", "*sniff*"],
  };

  // ---------- Suara meow (rekaman kucing CC0, nadanya dinaikkan jadi suara anak kucing) ----------
  const meowSound = new Audio("meow1.m4a");
  meowSound.preload = "auto";
  const MEOW_SECONDS = 0.89;
  // Memutar meow, mengembalikan lama suara (ms) supaya mulut kucing bisa sinkron
  function meow(mood) {
    try {
      const a = meowSound.cloneNode();
      // sad = lebih rendah/lambat, happy = lebih tinggi/ceria
      const rate = ({ sad: 0.8, happy: 1.12, love: 1.05 }[mood] || 1) * (0.95 + Math.random() * 0.1);
      a.preservesPitch = false;
      a.playbackRate = rate;
      a.play().catch(() => {});
      return (MEOW_SECONDS / rate) * 1000;
    } catch (_) {
      return 800;
    }
  }

  function boop(el) {
    const mood = el.dataset.mood;
    const ms = meow(mood);
    el.classList.add("meowing");
    clearTimeout(el._meowTimer);
    el._meowTimer = setTimeout(() => el.classList.remove("meowing"), ms);
    el.classList.remove("boop");
    void el.offsetWidth; // restart animasi
    el.classList.add("boop");

    const lines = LINES[mood] || LINES.normal;
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.textContent = lines[Math.floor(Math.random() * lines.length)];
    el.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1400);

    const icons = mood === "sad" ? ["💧", "💧"] : ["💕", "🧡", "🐾", "✨"];
    for (let i = 0; i < 4; i++) {
      const p = document.createElement("span");
      p.className = "pop-emoji";
      p.textContent = icons[i % icons.length];
      p.style.setProperty("--dx", (Math.random() * 120 - 60).toFixed(0) + "px");
      p.style.left = 40 + Math.random() * 20 + "%";
      el.appendChild(p);
      setTimeout(() => p.remove(), 1100);
    }

    if (navigator.vibrate) {
      try { navigator.vibrate(15); } catch (_) {}
    }
  }

  // Dipanggil dari script.js saat pindah layar
  window.catSpeak = function (el) {
    if (el) boop(el);
  };

  window.initCats = function () {
    document.querySelectorAll(".cat").forEach((el) => {
      el.innerHTML = catSVG(el.dataset.mood);
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", "elus kucing");
      el.addEventListener("click", () => boop(el));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); boop(el); }
      });
    });

    // Sentuhan pertama di halaman: kucing menyapa. Browser melarang suara otomatis
    // sebelum ada interaksi, jadi ini momen paling awal yang bisa. Tombol punya meow sendiri.
    window.addEventListener(
      "pointerdown",
      (e) => {
        if (e.target.closest("button")) return;
        boop(document.querySelector(".screen.active .cat"));
      },
      { once: true, capture: true }
    );

    // Mata ngikutin kursor / jari
    const follow = (x, y) => {
      const cat = document.querySelector(".screen.active .cat[data-mood='normal']");
      if (!cat) return;
      const look = cat.querySelector(".look");
      const r = cat.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2);
      const dy = y - (r.top + r.height * 0.5);
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(4, d / 40);
      look.style.transform = `translate(${(dx / d) * m}px, ${(dy / d) * m}px)`;
    };
    window.addEventListener("pointermove", (e) => follow(e.clientX, e.clientY), { passive: true });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0];
      if (t) follow(t.clientX, t.clientY);
    }, { passive: true });
  };
})();
