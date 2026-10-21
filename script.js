(function () {
  const CONFIG = window.CONFIG || {};
  const $ = (sel) => document.querySelector(sel);

  window.initCats();

  // ---------- Emoji melayang ----------
  const floaties = $(".bg-floaties");
  const emojis = ["🐱", "🧡", "🐾", "😺", "💛", "🌸","❤️","😻","💕","😽","🫶","👩‍❤️‍💋‍👨"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 16 + Math.random() * 18 + "px";
    s.style.animationDuration = 9 + Math.random() * 10 + "s";
    s.style.animationDelay = -Math.random() * 18 + "s";
    floaties.appendChild(s);
  }

  // ---------- Navigasi screen ----------
  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $("#screen-" + id).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Nama diambil dari link, contoh: /?nama=Siti
  const nama = (new URLSearchParams(location.search).get("nama") || "").trim().slice(0, 30) || "kamu";
  document.querySelectorAll(".nama").forEach((el) => (el.textContent = nama));

  // Tiap kali balik dari layar sedih, tombol Yes makin besar
  let yesScale = 1;
  const btnYes = $("#btn-yes");
  $("#btn-yes").addEventListener("click", () => show("date"));
  $("#btn-no").addEventListener("click", () => show("sad"));
  $("#btn-back").addEventListener("click", () => {
    yesScale = Math.min(yesScale + 0.2, 1.8);
    btnYes.style.fontSize = 19 * yesScale + "px";
    btnYes.style.padding = `${14 * yesScale}px ${30 * yesScale}px`;
    show("ask");
  });

  // ---------- Form tanggal ----------
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const inputTanggal = $("#input-tanggal");
  inputTanggal.min = today;

  function formatTanggal(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const form = $("#date-form");
  const errorEl = $("#form-error");
  const btnSubmit = $("#btn-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const tanggal = data.get("tanggal");

    if (!tanggal) {
      errorEl.textContent = "Pilih tanggalnya dulu dong 🥺";
      return;
    }
    if (tanggal < today) {
      errorEl.textContent = "Tanggalnya udah lewat, pilih yang lain ya 🙈";
      return;
    }
    errorEl.textContent = "";

    const payload = {
      nama,
      tanggal,
      jam: data.get("jam") || "",
      catatan: (data.get("catatan") || "").trim(),
      device: navigator.userAgent,
    };

    try {
      localStorage.setItem("jalankuy", JSON.stringify(payload));
    } catch (_) {}

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Mengirim... 🐾";

    try {
      if (CONFIG.SHEET_URL) {
        // no-cors: Apps Script tidak kirim header CORS, respons tidak perlu dibaca
        await fetch(CONFIG.SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          body: new URLSearchParams(payload),
        });
      } else {
        console.warn("SHEET_URL belum diisi di config.js, data tidak disimpan ke Google Sheets.");
      }
      $("#thanks-date").textContent =
        formatTanggal(tanggal) + (payload.jam ? `, jam ${payload.jam}` : "");
      show("thanks");
    } catch (err) {
      errorEl.textContent = "Yah, gagal kirim. Coba lagi ya 😿";
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Kirim 💌";
    }
  });
})();
