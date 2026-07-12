// ===== SLIDESHOW =====
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideshowTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  indicators[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  indicators[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startSlideshow() {
  slideshowTimer = setInterval(nextSlide, 5000);
}

function resetSlideshow() {
  clearInterval(slideshowTimer);
  startSlideshow();
}

indicators.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    goToSlide(i);
    resetSlideshow();
  });
});

// Start on load
if (slides.length > 0) {
  startSlideshow();
}

// ===== ACTIVE NAV LINK on scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== SMOOTH SCROLL for nav links =====
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== REVIEW SLIDESHOW =====
const reviewTrack = document.getElementById('review-track');
const reviewDots = document.querySelectorAll('.review-dot');
const reviewSlides = document.querySelectorAll('.review-slide');
let currentReview = 0;
let reviewTimer;

function goToReview(index) {
  currentReview = (index + reviewSlides.length) % reviewSlides.length;
  reviewTrack.style.transform = `translateX(-${currentReview * 100}%)`;
  reviewDots.forEach((d, i) => d.classList.toggle('active', i === currentReview));
}

function startReviewTimer() {
  reviewTimer = setInterval(() => goToReview(currentReview + 1), 6000);
}

function resetReviewTimer() {
  clearInterval(reviewTimer);
  startReviewTimer();
}

const prevBtn = document.getElementById('review-prev');
const nextBtn = document.getElementById('review-next');

if (prevBtn) {
  prevBtn.addEventListener('click', () => { goToReview(currentReview - 1); resetReviewTimer(); });
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => { goToReview(currentReview + 1); resetReviewTimer(); });
}

reviewDots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToReview(parseInt(dot.dataset.slide));
    resetReviewTimer();
  });
});

if (reviewTrack) startReviewTimer();

// ===== MENU CATEGORY TABS =====
const catBtns = document.querySelectorAll('.cat-btn');
const menuPanels = document.querySelectorAll('.menu-panel');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.cat;

    catBtns.forEach(b => b.classList.remove('active'));
    menuPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById(`cat-${target}`);
    if (panel) panel.classList.add('active');
  });
});
