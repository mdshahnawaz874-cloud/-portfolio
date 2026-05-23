// ─────────────────────────────────────────────
//  Shahnawaz Hussain Portfolio — script.js
//  Ultra Premium Animations & Interactions
// ─────────────────────────────────────────────

// ── CURSOR ──
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .tech-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width  = '60px';
    cursorFollower.style.height = '60px';
    cursorFollower.style.borderColor = 'rgba(200,255,0,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width  = '36px';
    cursorFollower.style.height = '36px';
    cursorFollower.style.borderColor = 'rgba(200,255,0,0.4)';
  });
});

// ── NAVBAR SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── MOBILE MENU ──
const burger     = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen     = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── HERO CANVAS — PARTICLE SYSTEM ──
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animFrameId;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.size  = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.85
      ? `rgba(200,255,0,${this.opacity})`
      : `rgba(255,255,255,${this.opacity * 0.4})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Lines between close particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(200,255,0,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  const count = Math.min(120, Math.floor(canvas.width * canvas.height / 12000));
  particles = Array.from({ length: count }, () => new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

// Mouse interaction
let mouse = { x: null, y: null };
canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    if (mouse.x !== null) {
      const dx   = p.x - mouse.x;
      const dy   = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x += (dx / dist) * 0.8;
        p.y += (dy / dist) * 0.8;
      }
    }
    p.update();
    p.draw();
  });
  drawConnections();
  animFrameId = requestAnimationFrame(animateParticles);
}
animateParticles();

// ── ROLE CYCLE ──
const roles = ['AI Platforms', 'Web Apps', 'SEO Strategies', 'Digital Brands', 'Real Products'];
let roleIdx = 0;
const roleCycle = document.getElementById('roleCycle');

function cycleRole() {
  roleCycle.style.opacity = '0';
  setTimeout(() => {
    roleIdx = (roleIdx + 1) % roles.length;
    roleCycle.textContent = roles[roleIdx];
    roleCycle.style.opacity = '1';
  }, 300);
}
setInterval(cycleRole, 2500);

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
      // Also trigger counters on the element itself
      if (entry.target.dataset.count) {
        animateCounter(entry.target, parseInt(entry.target.dataset.count));
      }
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Also observe stat items directly
document.querySelectorAll('.stat-item').forEach(item => {
  const numEl = item.querySelector('[data-count]');
  if (!numEl) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(numEl, parseInt(numEl.dataset.count));
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  obs.observe(item);
});

// ── SMOOTH NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CONTACT FORM ──
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn  = e.target.querySelector('.btn-primary');
  const span = btn.querySelector('span');
  btn.disabled = true;
  span.textContent = 'Message Sent! ✓';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    span.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});

// ── TILT EFFECT ON CARDS ──
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left - rect.width / 2;
    const y      = e.clientY - rect.top  - rect.height / 2;
    const rotX   = (-y / rect.height) * 8;
    const rotY   = ( x / rect.width)  * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });

// ── PAGE LOAD ANIMATION ──
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  // Trigger hero reveals immediately
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
});
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
