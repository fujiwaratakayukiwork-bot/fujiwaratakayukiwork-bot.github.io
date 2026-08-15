const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const mobileQuery = window.matchMedia('(max-width: 640px)');

function closeMenu({ restoreFocus = false } = {}) {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');

  if (restoreFocus) {
    menuButton.focus();
  }
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';

  if (!willOpen) {
    closeMenu();
    return;
  }

  header.classList.add('menu-open');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'メニューを閉じる');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a') && mobileQuery.matches) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});

document.addEventListener('click', (event) => {
  if (mobileQuery.matches && !header.contains(event.target)) {
    closeMenu();
  }
});

mobileQuery.addEventListener('change', () => closeMenu());
