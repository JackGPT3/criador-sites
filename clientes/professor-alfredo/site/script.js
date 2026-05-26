// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = answer.classList.contains('open');

  // Fecha todos
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));

  // Abre o clicado (se estava fechado)
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('active');
  }
}

// Header shrink no scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(0,0,0,0.25)'
    : '0 2px 12px rgba(0,0,0,0.18)';
});
