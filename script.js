// ---------- config ----------

// EDIT ME: write her the real letter here — each string becomes one line
// that fades/types in on scene 4.
const letterLines = [
  "I don't really know how to put this into words, but I'm going to try.",
  "Knowing you has made the ordinary days feel a little more like magic.",
  "I hope today reminds you of everything you mean to the people around you.",
  "Here's to more laughter, more memories, and many more birthdays together.",
];

const PETAL_COUNT = 26;
const PETAL_DURATION_RANGE = [3.2, 5.5]; // seconds

// ---------- element refs ----------

const scenes = Array.from(document.querySelectorAll(".scene"));
const dots = Array.from(document.querySelectorAll(".dot"));
const petalField = document.getElementById("petalField");
const songWishes = document.getElementById("songWishes");
const songHbd = document.getElementById("songHbd");
const cakeMusicStatus = document.getElementById("cakeMusicStatus");

let letterPlayed = false;

// ---------- scene navigation ----------

function goToScene(id) {
  scenes.forEach((s) => s.classList.toggle("is-active", s.id === id));
  dots.forEach((d) => d.classList.toggle("active", d.dataset.dot === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  onSceneEnter(id);
}

function onSceneEnter(id) {
  // pause whichever track shouldn't be playing anymore
  if (id !== "scene-wishes" && !songWishes.paused) songWishes.pause();
  if (id !== "scene-cake" && !songHbd.paused) songHbd.pause();

  if (id === "scene-wishes") {
    songWishes.currentTime = 0;
    songWishes.play().catch(() => undefined);
  }

  if (id === "scene-cake") {
    songHbd.currentTime = 0;
    songHbd.play().catch(() => undefined);
  }

  if (id === "scene-letter") {
    playLetter();
  }

  if (id === "scene-video") {
    startPinkboard();
  }
}

// wire every button that carries data-next="sceneId"
document.querySelectorAll("[data-next]").forEach((btn) => {
  btn.addEventListener("click", () => goToScene(btn.dataset.next));
});

document.getElementById("startBtn").addEventListener("click", () => {
  showerPetals();
  goToScene("scene-wishes");
});

// ---------- falling petals ----------

function showerPetals(count = PETAL_COUNT) {
  petalField.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("img");
    petal.src = "assets/flower.png";
    petal.alt = "";
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    const duration = PETAL_DURATION_RANGE[0] + Math.random() * (PETAL_DURATION_RANGE[1] - PETAL_DURATION_RANGE[0]);
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${Math.random() * 0.8}s`;
    petalField.appendChild(petal);
  }
  const clearAfter = (PETAL_DURATION_RANGE[1] + 1) * 1000;
  window.setTimeout(() => { petalField.innerHTML = ""; }, clearAfter);
}

// ---------- cake scene: auto-advance when the song ends ----------

songHbd.addEventListener("ended", () => {
  goToScene("scene-letter");
});

// if hbd.mp3 is missing or fails to load, don't leave the slide stuck —
// let the visible "Continue →" button on that scene do the job instead.
songHbd.addEventListener("error", () => {
  if (cakeMusicStatus) cakeMusicStatus.textContent = "♪ tap continue when you're ready";
});

// ---------- letter: fade-in line reveal ----------

function playLetter() {
  if (letterPlayed) return;
  letterPlayed = true;

  const container = document.getElementById("letterLines");
  container.innerHTML = "";

  letterLines.forEach((line, i) => {
    const p = document.createElement("p");
    p.className = "letter-line";
    p.textContent = line;
    p.style.animationDelay = `${i * 0.9}s`;
    container.appendChild(p);
  });
}

// ---------- scene 5: floating hearts background ----------
// lazily initialised the first time scene-video is opened, so it never
// wastes cycles animating behind a hidden slide.

let pinkboardStarted = false;

function startPinkboard() {
  if (pinkboardStarted) return;
  pinkboardStarted = true;

  var $bg = window.jQuery && jQuery("#scene-video .bg_heart");
  if (!$bg || !$bg.length) return;

  setInterval(function () {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;

    $bg.append(
      "<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left +
      "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time +
      "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " +
      r_time + "s ease'></div>"
    );

    $bg.append(
      "<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) +
      "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) +
      "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " +
      (r_time + 5) + "s ease'></div>"
    );

    $bg.find(".heart").each(function () {
      var top = jQuery(this).css("top").replace(/[^-\d.]/g, "");
      var width = jQuery(this).css("width").replace(/[^-\d.]/g, "");
      if (top <= -100 || width >= 150) {
        jQuery(this).detach();
      }
    });
  }, 500);
}

// ---------- init ----------

goToScene("scene-start");
