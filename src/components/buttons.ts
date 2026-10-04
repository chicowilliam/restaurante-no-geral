export function buttonContent(label: string): string {
  return `<span class="button__label">${label}</span><span class="button__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></span>`;
}

export function actionLink(label: string, href: string): string {
  return `<a class="button button--outline btn-secondary" href="${href}">${buttonContent(label)}</a>`;
}
