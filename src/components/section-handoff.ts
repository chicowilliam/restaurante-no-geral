type Handoff = 'route' | 'arc' | 'quiet' | 'terminal';

const drawings: Record<Handoff, { path: string; node: [number, number] }> = {
  route: { path: 'M0 15H225C310 15 305 65 410 65H1190C1310 65 1290 28 1410 28H1600', node: [410, 65] },
  arc: { path: 'M-20 70C225 70 200 12 485 12S850 72 1180 48S1450 10 1620 10', node: [1180, 48] },
  quiet: { path: 'M80 40H1130M1150 40H1520', node: [1140, 40] },
  terminal: { path: 'M1550 18H1080C825 18 690 57 390 57H80', node: [80, 57] },
};

export function sectionHandoff(type: Handoff = 'quiet'): string {
  const drawing = drawings[type];
  return `<div class="section-handoff section-handoff--${type}" aria-hidden="true" data-motion="divider"><svg viewBox="0 0 1600 80" preserveAspectRatio="none" fill="none"><path data-draw d="${drawing.path}"/><circle data-node cx="${drawing.node[0]}" cy="${drawing.node[1]}" r="4"/></svg></div>`;
}
