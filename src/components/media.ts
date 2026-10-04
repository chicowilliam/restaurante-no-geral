type ImageOptions = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

export function image({ src, alt, width, height, className = '', eager = false }: ImageOptions): string {
  return `<img class="${className}" src="${src}" alt="${alt}" width="${width}" height="${height}" decoding="async" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} />`;
}
