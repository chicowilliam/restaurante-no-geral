type MenuDrawing = 'herb' | 'plate' | 'glass' | 'bottle';

// Original pen studies for the printed menu. Deliberately open, uneven contours.
const drawings: Record<MenuDrawing, string> = {
  herb: `<path d="M21 89C43 69 60 43 83 12M30 79C17 74 16 64 18 59C31 60 37 66 36 73M41 66C51 69 64 63 66 55C55 51 47 55 44 60M48 54C33 51 31 42 34 36C47 39 52 44 52 48M61 40C71 43 82 36 83 29C75 26 67 29 65 33M69 29C60 25 59 15 63 11C70 15 74 20 73 24M80 18C79 7 89 4 94 6C94 13 89 20 85 20"/><path d="m22 90 11-5m-4-9-8-10m28-5 10-2m-13-15-6-4m30-5 6-3"/>`,
  plate: `<path d="M17 52C13 33 36 20 58 23C82 23 103 36 99 54C97 72 71 81 48 77C30 75 19 67 17 52ZM27 52C24 40 40 30 59 32C77 31 91 41 89 54C85 68 63 72 46 67C34 64 27 60 27 52"/><path d="M5 17 7 77M0 18 1 34Q7 40 11 33L12 17M6 18 6 34M114 17C106 32 105 48 112 48L111 79M113 18 113 48M43 46C52 43 64 49 70 44M49 52l11 5m4-20 3 4"/>`,
  glass: `<path d="M40 10C49 8 72 11 78 12C81 30 78 45 66 50C50 55 36 40 37 27L40 10M40 28C50 32 66 34 79 29M58 51 56 84M57 54 59 84M41 89C49 82 66 82 76 89C64 94 49 94 41 89"/><path d="M43 19c-2 9-1 15 4 20m2-3 4 2M89 51l10-4m-11 12 10 2"/>`,
  bottle: `<path d="M49 8 67 9L66 28C65 34 77 38 78 47L76 90Q60 96 44 90L43 47C43 39 52 34 51 28L49 8M49 15l18 1M44 51 77 53M44 73l32 2"/><path d="M53 57C68 56 68 69 56 69M53 59l2 9m-4-24-1 5M89 39C102 37 112 39 113 40C115 52 111 60 102 61C93 60 86 53 89 39M100 61l-1 22m-9 5c6-5 17-5 23 0m-23-38 22 1"/>`,
};

export function menuIllustration(drawing: MenuDrawing): string {
  return `<svg class="menu-illustration menu-illustration--${drawing}" viewBox="0 0 120 100" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">${drawings[drawing]}</svg>`;
}
