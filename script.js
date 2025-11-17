// p5.js 粒子背景
let particles = [];

function setup() {
  const cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.position(0, 0);
  cnv.style("z-index", "-1");
  for (let i = 0; i < 90; i++) {
    particles.push({ x: random(width), y: random(height), s: random(1, 3) });
  }
}

function draw() {
  background(14, 14, 15, 28);
  noStroke();
  fill(255, 255, 255, 36);
  particles.forEach((p) => {
    ellipse(p.x, p.y, p.s);
    p.y += 0.18;
    if (p.y > height) p.y = 0;
  });
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// GSAP 呼吸球動畫
gsap.to("#breathing-ball", {
  scale: 1.25,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// 點擊呼吸球放慢節奏
const ball = document.getElementById("breathing-ball");
ball.addEventListener("click", () => {
  gsap.to("#breathing-ball", {
    scale: 1.3,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});

// 初始文字淡入
setTimeout(() => {
  document.getElementById("intro-text-1").style.opacity = 1;
}, 800);
setTimeout(() => {
  document.getElementById("intro-text-2").style.opacity = 1;
}, 1600);
setTimeout(() => {
  document.getElementById("breath-text-1").style.opacity = 1;
}, 2200);
setTimeout(() => {
  document.getElementById("breath-text-2").style.opacity = 1;
}, 3000);
setTimeout(() => {
  document.getElementById("breath-text-3").style.opacity = 1;
}, 3800);
setTimeout(() => {
  document.getElementById("breath-hint").style.opacity = 1;
}, 4600);

// 滾動觸發段落顯示
function revealOnScroll(sectionId, ids) {
  const rect = document.getElementById(sectionId).getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.65) {
    ids.forEach((id, index) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = 1;
      }, index * 400);
    });
  }
}

window.addEventListener("scroll", () => {
  revealOnScroll("emotion", ["emo-text-1", "emo-text-2", "emo-text-3"]);
  revealOnScroll("body", ["body-text-1", "body-text-2", "body-text-3"]);
  revealOnScroll("outro", ["outro-text-1", "outro-text-2"]);
});

// Web Audio API 簡單環境音
let audioCtx;
let ambient;

function startAmbient() {
  if (audioCtx) return; // 避免重複建立
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  ambient = audioCtx.createOscillator();
  ambient.type = "sine";
  ambient.frequency.value = 80;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.045;
  ambient.connect(gain).connect(audioCtx.destination);
  ambient.start();
}

// 第一次點擊啟動環境聲
document.body.addEventListener(
  "click",
  () => {
    startAmbient();
  },
  { once: true }
);
