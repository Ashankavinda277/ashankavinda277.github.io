/**
 * Windows and some desktop Linux installs often have no default `mailto:`
 * handler registered. In that state a mailto link opens an app-chooser that
 * lists browsers and then does nothing, so on desktop we send the user to
 * Gmail's compose view instead. Mobile keeps the native mailto: handoff,
 * where a mail app is reliably configured.
 */

const MOBILE_UA = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i;

export function isMobileUA(): boolean {
  return MOBILE_UA.test(navigator.userAgent);
}

/** Extracts the bare address from a `mailto:` href. */
export function addressFromMailto(href: string): string {
  return href.replace(/^mailto:/, '').split('?')[0] ?? '';
}

export function openMailCompose(href: string): void {
  if (isMobileUA()) {
    window.location.href = href;
    return;
  }
  const email = addressFromMailto(href);
  window.open(
    `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

/** Intercepts clicks on any `mailto:` anchor in the document. */
export function installMailtoInterceptor(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
    if (!link || isMobileUA()) return;
    e.preventDefault();
    openMailCompose(link.href);
  });
}
