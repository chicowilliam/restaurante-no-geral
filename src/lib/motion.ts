import { initSmoothScroll } from './smooth-scroll';

function initHeaderSurface(): IntersectionObserver | undefined {
  const header = document.querySelector<HTMLElement>('.site-header');
  const sentinel = document.querySelector<HTMLElement>('.header-sentinel');
  if (!header || !sentinel) return;
  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting && entry.boundingClientRect.top < 0);
  });
  observer.observe(sentinel);
  return observer;
}

export async function initMotion(): Promise<void> {
  const headerObserver = initHeaderSurface();
  document.documentElement.dataset.scrollMode = 'native';
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  await document.fonts.ready;
  const rootStyle = getComputedStyle(document.documentElement);
  const seconds = (token: string) => parseFloat(rootStyle.getPropertyValue(token)) / 1000;
  const duration = seconds('--motion-base');
  const slow = seconds('--motion-slow');
  const ease = 'power3.out';
  const targets = [...document.querySelectorAll<HTMLElement>('[data-motion]')];
  const active = new Map<HTMLElement, ReturnType<typeof gsap.timeline>>();
  const media = gsap.matchMedia();
  let heroHasEntered = false;

  media.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 1024px), (pointer: coarse)', desktop: '(min-width: 1025px) and (pointer: fine)' }, (context) => {
    const conditions = context.conditions as { reduced: boolean; mobile: boolean };
    active.clear();
    document.documentElement.dataset.motionMode = conditions.reduced ? 'reduced' : 'animated';
    if (conditions.reduced) return;
    const y = conditions.mobile ? 12 : 16;
    const hero = document.querySelector<HTMLElement>('.hero');

    if (hero && !heroHasEntered && performance.now() < 1800 && hero.getBoundingClientRect().bottom > 0) {
      heroHasEntered = true;
      const entrance = gsap.timeline({ defaults: { duration, ease } });
      entrance.fromTo('.hero__image', { scale: 1.035 }, { scale: 1, duration: slow * 1.2, clearProps: 'transform' }, 0)
        .fromTo('.hero__eyebrow', { opacity: 0, y: 8 }, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, .05)
        .fromTo('.hero__title .motion__content', { yPercent: 110 }, { yPercent: 0, duration: slow * .85, stagger: .06, clearProps: 'transform' }, .13)
        .fromTo('.hero__description', { opacity: 0, y: 10 }, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, .48)
        .fromTo('.hero__actions', { opacity: 0, y: 8 }, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, .6)
        .fromTo('.hero__meta', { opacity: 0 }, { opacity: 1, duration: duration * .65, clearProps: 'opacity' }, .85);
      targets.filter((element) => hero.contains(element)).forEach((element) => active.set(element, entrance));
    }

    targets.forEach((element) => {
      if (element.closest('.hero') || !element.getClientRects().length || element.getBoundingClientRect().bottom < 0) return;
      const timeline = gsap.timeline({ paused: true, defaults: { duration, ease } });
      const type = element.dataset.motion;
      if (type === 'headline') {
        timeline.fromTo(element.querySelectorAll('.motion__content'), { yPercent: 110 }, { yPercent: 0, duration: slow * .8, clearProps: 'transform' });
      } else if (type === 'image' || type === 'product') {
        timeline.fromTo(element.querySelectorAll('img'), { scale: conditions.mobile ? 1.025 : 1.035, clipPath: 'inset(8% 0 0 0)' }, { scale: 1, clipPath: 'inset(0 0 0 0)', duration: slow, clearProps: 'transform,clipPath' });
        if (type === 'product') timeline.fromTo(element.querySelectorAll('.dish-feature__heading, :scope > p'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, .12);
      } else if (type === 'divider') {
        element.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path) => {
          const length = path.getTotalLength();
          timeline.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: slow, clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
        });
        timeline.fromTo(element.querySelectorAll('[data-node]'), { opacity: 0 }, { opacity: .6, duration: duration * .5 }, slow * .6);
      } else if (type === 'group') {
        timeline.fromTo(element.children, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: .055, clearProps: 'transform,opacity' });
      } else timeline.fromTo(element, { opacity: 0, y }, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
      active.set(element, timeline);
      ScrollTrigger.create({ trigger: element, start: 'top 94%', end: 'bottom top', once: true, onEnter: () => timeline.play(), onLeave: () => timeline.progress(1) });
    });
  });

  const revealFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const parent = event.target.closest<HTMLElement>('[data-motion]');
    if (parent) active.get(parent)?.progress(1);
  };
  const revealDestination = () => {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    active.forEach((animation, element) => { if (target.contains(element) || element.contains(target)) animation.progress(1); });
  };
  document.addEventListener('focusin', revealFocus);
  window.addEventListener('hashchange', revealDestination);
  revealDestination();
  ScrollTrigger.refresh();
  // The first refresh can interrupt the browser's initial smooth hash navigation.
  if (location.hash && window.scrollY === 0) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant', block: 'start' });
  const stopSmoothScroll = await initSmoothScroll(gsap, ScrollTrigger);
  window.addEventListener('pagehide', (event) => {
    if (event.persisted) return;
    stopSmoothScroll();
    media.revert();
    headerObserver?.disconnect();
    document.removeEventListener('focusin', revealFocus);
    window.removeEventListener('hashchange', revealDestination);
  });
}
