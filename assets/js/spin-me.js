/* Drag-to-spin viewer for the "me in 3D" icon.
   Swaps the GIF for a sprite sheet so frames can be scrubbed with the mouse,
   touch or arrow keys. Auto-spins unless calm mode / reduced motion is on. */
(function () {
  var fig = document.querySelector("[data-spin-me]");
  if (!fig) return;

  var frames = +fig.getAttribute("data-frames");
  var cols = +fig.getAttribute("data-cols");
  var rows = Math.ceil(frames / cols);
  var src = fig.getAttribute("data-sprite");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  var view = document.createElement("div");
  view.className = "spin-me__view";
  view.tabIndex = 0;
  view.setAttribute("role", "img");
  view.setAttribute("aria-label", "3D render of Sergio. Drag or use the arrow keys to spin.");
  view.style.backgroundImage = "url(" + src + ")";
  view.style.backgroundSize = cols * 100 + "% " + rows * 100 + "%";

  var frame = 0, timer = null, drag = null;

  function show(n) {
    frame = ((n % frames) + frames) % frames;
    var c = frame % cols, r = Math.floor(frame / cols);
    view.style.backgroundPosition =
      (c / (cols - 1)) * 100 + "% " + (rows > 1 ? (r / (rows - 1)) * 100 : 0) + "%";
  }

  function calm() {
    return reduce.matches || document.documentElement.classList.contains("calm");
  }

  function tick() {
    if (!drag && !calm()) show(frame + 1);
  }

  view.addEventListener("pointerdown", function (e) {
    drag = { x: e.clientX, start: frame };
    try { view.setPointerCapture(e.pointerId); } catch (err) {}
    view.classList.add("is-dragging");
    e.preventDefault();
  });
  view.addEventListener("pointermove", function (e) {
    if (drag) show(drag.start + Math.round((drag.x - e.clientX) / 3));
  });
  function release() {
    drag = null;
    view.classList.remove("is-dragging");
  }
  view.addEventListener("pointerup", release);
  view.addEventListener("pointercancel", release);
  view.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(frame + 2);
    else if (e.key === "ArrowRight") show(frame - 2);
    else return;
    e.preventDefault();
  });

  var img = new Image();
  img.onload = function () {
    show(0);
    fig.insertBefore(view, fig.firstChild);
    fig.classList.add("is-live");
    timer = setInterval(tick, 100);
  };
  img.src = src;
})();
