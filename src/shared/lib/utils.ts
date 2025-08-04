import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeEmpty<T>(obj?: T): void {
  for (const key in obj) {
    const keyObj = key as keyof T
    if (obj[keyObj] === '') {
      delete obj[keyObj]
    }
  }
}
