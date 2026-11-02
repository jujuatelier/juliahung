(() => {
  const header = document.querySelector('.hdr, .stage__hdr');
  const sourceNav = header?.querySelector('.hdr__nav, .stage__nav');
  const homeLink = header?.querySelector('.hdr__mark, .stage__mark');
  if (!header || !sourceNav || !homeLink) return;

  const toggle = document.createElement('button');
  toggle.className = 'mobile-menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open navigation menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'mobile-navigation');
  toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  header.append(toggle);

  const backdrop = document.createElement('button');
  backdrop.className = 'mobile-menu-backdrop';
  backdrop.type = 'button';
  backdrop.tabIndex = -1;
  backdrop.setAttribute('aria-label', 'Close navigation menu');

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-menu-drawer';
  drawer.id = 'mobile-navigation';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', 'Navigation menu');
  drawer.setAttribute('aria-modal', 'true');

  const close = document.createElement('button');
  close.className = 'mobile-menu-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close navigation menu');
  close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';

  const links = document.createElement('nav');
  links.className = 'mobile-menu-links';
  links.setAttribute('aria-label', 'Main');
  const home = homeLink.cloneNode(true);
  home.textContent = 'Home';
  links.append(home);
  sourceNav.querySelectorAll('a').forEach((link) => links.append(link.cloneNode(true)));
  links.querySelectorAll('a').forEach((link) => {
    const target = new URL(link.href, location.href);
    if (target.origin === location.origin && target.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  drawer.append(close, links);
  document.body.append(backdrop, drawer);

  let previousFocus = null;
  let pageScrollY = 0;
  const openMenu = () => {
    if (!matchMedia('(max-width: 600px)').matches) return;
    previousFocus = document.activeElement;
    pageScrollY = window.scrollY;
    document.body.style.top = `-${pageScrollY}px`;
    document.body.classList.add('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    close.focus();
  };
  const closeMenu = () => {
    document.body.classList.remove('mobile-menu-open');
    document.body.style.top = '';
    window.scrollTo(0, pageScrollY);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };
  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  links.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (event) => {
    if (!document.body.classList.contains('mobile-menu-open')) return;
    if (event.key === 'Escape') closeMenu();
    if (event.key === 'Tab') {
      const focusable = [...drawer.querySelectorAll('button, a')];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  matchMedia('(min-width: 601px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
})();
