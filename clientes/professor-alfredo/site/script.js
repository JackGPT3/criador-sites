// FAQ Accordion (com animação suave via max-height no CSS)
function toggleAcc(btn) {
  const item = btn.closest('.acc-item');
  const content = item.querySelector('.acc-content');
  const isOpen = content.classList.contains('open');

  // Fecha todos
  document.querySelectorAll('.acc-content').forEach(c => c.classList.remove('open'));
  document.querySelectorAll('.acc-title').forEach(b => b.setAttribute('aria-expanded', 'false'));

  // Abre o clicado (se estava fechado)
  if (!isOpen) {
    content.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

// WhatsApp widget
function toggleWa() {
  const box = document.getElementById('wa-box');
  box.classList.toggle('show');
}

// Abre o widget automaticamente após 3s
setTimeout(() => {
  const box = document.getElementById('wa-box');
  if (box) box.classList.add('show');
}, 3000);

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
