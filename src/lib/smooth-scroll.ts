import type Lenis from 'lenis';
import type { gsap } from 'gsap';
import type { ScrollTrigger } from 'gsap/ScrollTrigger';

let instance: Lenis | undefined;
let paused = false;

export function setSmoothScrollPaused(value: boolean, position?: number): void {
  paused = value;
  if (value) instance?.stop();
  else {
    instance?.start();
    if (position !== undefined) instance?.scrollTo(position, { immediate: true, force: true });
  }
}

export async function initSmoothScroll(engine: typeof gsap, triggers: typeof ScrollTrigger): Promise<() => void> {
  const preferences = [window.matchMedia('(pointer: fine)'), window.matchMedia('(prefers-reduced-motion: no-preference)'), window.matchMedia('(min-width: 1025px)'), window.matchMedia('(any-pointer: coarse)')];
  let revision = 0;
  let ticker: ((time: number) => void) | undefined;
  const allowed = () => preferences[0].matches && preferences[1].matches && preferences[2].matches && !preferences[3].matches;
  const destroy = () => {
    if (ticker) engine.ticker.remove(ticker);
    ticker = undefined;
    instance?.destroy();
    instance = undefined;
    document.documentElement.dataset.scrollMode = 'native';
  };
  const sync = async () => {
    const current = ++revision;
    destroy();
    if (!allowed()) return;
    const { default: SmoothScroll } = await import('lenis');
    if (current !== revision || !allowed()) return;
    instance = new SmoothScroll({ lerp: .14, smoothWheel: true, syncTouch: false, autoRaf: false });
    instance.on('scroll', triggers.update);
    const active = instance;
    ticker = (time) => active.raf(time * 1000);
    engine.ticker.add(ticker);
    engine.ticker.lagSmoothing(0);
    if (paused) instance.stop();
    document.documentElement.dataset.scrollMode = 'smooth';
  };
  const onAnchor = (event: MouseEvent) => {
    if (!instance || paused || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
    if (!link || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', url.hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    instance.scrollTo(target, { duration: .85, onComplete: () => {
      const hadTabIndex = target.hasAttribute('tabindex');
      if (!hadTabIndex) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      if (!hadTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    } });
  };
  preferences.forEach((preference) => preference.addEventListener('change', sync));
  document.addEventListener('click', onAnchor);
  await sync();
  return () => {
    revision++;
    preferences.forEach((preference) => preference.removeEventListener('change', sync));
    document.removeEventListener('click', onAnchor);
    destroy();
  };
}
