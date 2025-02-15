import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ModuleType } from "./schema/QuestionSchema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseRoute(input: string) {
  return input.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
}

export function moduleParse(input: ModuleType) {
  switch (input) {
    case "MECHANICS": 
      return "Advanced Mechanics"
    case "LIGHT":
      return "The Nature of Light"
    case "ELECTROMAGNETISM":
      return "Electromagnetism"
    case "ASTROQUANTUM":
      return "From the Atom to the Universe"
  }
}

export function paramsParse(input: string) {
  switch (input) {
    case "advanced-mechanics": 
      return "MECHANICS"
    case "the-nature-of-light":
      return "LIGHT"
    case "from-the-universe-to-the-atom":
      return "ASTROQUANTUM"
    case "electromagnetism":
      return "ELECTROMAGNETISM"
    default:
      return "";
  }

}

export const fileToDataUrl = async (file: File) => {
  const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
  if (!file) return;

  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve,reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}


export function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}


export function getSearchParams(
  modules?: string | string[], 
  tags?: string | string[], 
  difficulty?: string | string[],
  query?: string | string[],
) {
  const queryString = new URLSearchParams();
  if (modules) {
    if (Array.isArray(modules)) {
      queryString.set("modules", modules.map(x => paramsParse(x)).join(","));
    } else {
      queryString.set("modules", paramsParse(modules));
    }
  }

  if (tags) {
    if (Array.isArray(tags)) {
      queryString.set("tags", tags.join(","));
    } else {
      queryString.set("tags", tags);
    }
  }

  if (difficulty) {
    if (Array.isArray(difficulty)) {
      queryString.set("difficulty", difficulty.join(",").toUpperCase()) ;
    } else {
      queryString.set("difficulty", difficulty.toUpperCase()) ;
    }
  }

  if (query) {
    if (!Array.isArray(query)) {
      queryString.set("query", query);
    }
  }

  return queryString; 
}


