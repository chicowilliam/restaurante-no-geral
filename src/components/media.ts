type ImageOptions = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
  srcset?: string;
  sizes?: string;
};

export function image({ src, alt, width, height, className = '', eager = false, srcset, sizes }: ImageOptions): string {
  return `<img class="${className}" src="${src}" alt="${alt}" width="${width}" height="${height}"${srcset ? ` srcset="${srcset}"` : ''}${sizes ? ` sizes="${sizes}"` : ''} decoding="async" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} />`;
}
