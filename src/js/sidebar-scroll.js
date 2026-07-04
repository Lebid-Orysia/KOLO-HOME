export function initSidebarScroll() {
  const sidebar = document.querySelector('.shop-catalog__sidebar');
  if (!sidebar) return; 

  let lastScrollY = window.scrollY;
  const isMobile = window.matchMedia('(max-width: 991px)');

  window.addEventListener('scroll', () => {
    if (!isMobile.matches) {
      sidebar.classList.remove('shop-catalog__sidebar--hidden');
      return;
    }

    const currentScrollY = window.scrollY;
    if (currentScrollY < 0) return;

    if (currentScrollY > lastScrollY && currentScrollY > 60) {
      sidebar.classList.add('shop-catalog__sidebar--hidden');
    } else {
      sidebar.classList.remove('shop-catalog__sidebar--hidden');
    }

    lastScrollY = currentScrollY;
  });
}
