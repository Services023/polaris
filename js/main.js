const pages = document.querySelectorAll('[data-page]');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

function showPage(hash) {
  const id = (hash || '#inicio').replace('#', '');
  pages.forEach((page) => page.classList.toggle('active', page.id === id));
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  if (mainNav) mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const href = link.getAttribute('href');
    history.pushState(null, '', href);
    showPage(href);
  });
});

window.addEventListener('popstate', () => showPage(location.hash));

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

showPage(location.hash || '#inicio');

const sliders = document.querySelectorAll('[data-slider]');
sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const dotsContainer = slider.querySelector('.slider-dots');
  let index = 0;
  let interval;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => activateSlide(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = Array.from(dotsContainer?.children || []);

  function activateSlide(nextIndex) {
    slides[index].classList.remove('active');
    dots[index]?.classList.remove('active');
    index = nextIndex;
    slides[index].classList.add('active');
    dots[index]?.classList.add('active');
  }

  function nextSlide() {
    activateSlide((index + 1) % slides.length);
  }

  if (slides.length > 1) {
    interval = setInterval(nextSlide, 4600);
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(nextSlide, 4600);
    });
  }
});

const serviceTabs = document.querySelectorAll('.service-tab');
const servicePanels = document.querySelectorAll('.service-panel');
serviceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.service;
    serviceTabs.forEach((item) => item.classList.toggle('active', item === tab));
    servicePanels.forEach((panel) => panel.classList.toggle('active', panel.id === `service-${key}`));
  });
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const servicio = document.getElementById('servicio').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const texto = `Hola Suva Polaris, soy ${nombre}. Deseo información sobre: ${servicio}. ${mensaje}`;
  window.open(`https://wa.me/51943333646?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
});
