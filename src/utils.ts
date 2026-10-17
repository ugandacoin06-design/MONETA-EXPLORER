import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHash(hash: string) {
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}
