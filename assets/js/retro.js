/* Retro homepage effects: visitor counter, 90s-mode toggle, sparkle trail. */
(function () {
  var root = document.documentElement;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* Hit counter: real total from GoatCounter, or a fake one if that fails. */
  var counter = document.querySelector("[data-counter]");
  if (counter) {
    var days = Math.floor((Date.now() - Date.UTC(1998, 7, 1)) / 86400000);
    var hits = 1337 + days * 3 + Math.floor(Math.random() * 3);
    counter.textContent = String(hits).padStart(7, "0");

    if (window.fetch) {
      fetch("https://sergio.goatcounter.com/counter/TOTAL.json")
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then(function (data) {
          var total = parseInt(String(data.count).replace(/\D/g, ""), 10);
          if (!isNaN(total)) {
            counter.textContent = String(total).padStart(7, "0");
            var note = document.querySelector(".counter__note");
            if (note) note.textContent = "(4 real!)";
          }
        })
        .catch(function () {});
    }
  }

  /* 90s mode toggle. */
  var calmButton = document.querySelector(".calm-toggle");
  function renderCalm() {
    var calm = root.classList.contains("calm");
    calmButton.textContent = calm ? "[ enable 90s mode ]" : "[ disable 90s mode ]";
    calmButton.setAttribute("aria-pressed", calm ? "true" : "false");
  }
  if (calmButton) {
    renderCalm();
    calmButton.addEventListener("click", function () {
      root.classList.toggle("calm");
      store("calm", root.classList.contains("calm") ? "1" : "0");
      renderCalm();
    });
  }

  /* Sparkle cursor trail, off by default. */
  var sparkleButton = document.querySelector("[data-sparkles]");
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sparkles = store("sparkles") === "1";
  var lastSparkle = 0;
  var glyphs = ["✦", "✧", "★", "⋆"];

  function renderSparkles() {
    sparkleButton.textContent = "✨ sparkles: " + (sparkles ? "on" : "off");
  }
  if (sparkleButton) {
    renderSparkles();
    sparkleButton.addEventListener("click", function () {
      sparkles = !sparkles;
      store("sparkles", sparkles ? "1" : "0");
      renderSparkles();
    });
  }

  document.addEventListener("mousemove", function (event) {
    if (!sparkles || reducedMotion || root.classList.contains("calm")) return;
    var now = Date.now();
    if (now - lastSparkle < 40) return;
    lastSparkle = now;
    var star = document.createElement("span");
    star.className = "sparkle";
    star.setAttribute("aria-hidden", "true");
    star.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    star.style.left = event.pageX + "px";
    star.style.top = event.pageY + "px";
    document.body.appendChild(star);
    setTimeout(function () { star.remove(); }, 800);
  });
})();
