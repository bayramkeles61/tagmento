import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { js } from 'js-beautify';
import registry from '@/registry.json';
import type { RegistryTag } from '@/registry/registry-tags';
import type { RegistryItem } from 'shadcn/registry';

export function formatJavaScriptCode(codeString: string) {
  const options = {
    indent_size: 2,
    space_in_empty_paren: true,
    eol: '\n',
    end_with_newline: true,
    preserve_newlines: true,
    break_chained_methods: false,
    max_preserve_newlines: 2,
    jslint_happy: false,
    keep_array_indentation: true,
    keep_function_indentation: true,
    space_before_conditional: true,
    unescape_strings: false,
    wrap_line_length: 0,
    space_after_anon_function: true,
  };

  return js(codeString, options);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uuid() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString();
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

const components = registry.items as unknown as RegistryItem[];

export const getComponents = (selectedTags: RegistryTag[] = []): RegistryItem[] => {
  return selectedTags.length
    ? components.filter((component) => selectedTags.every((tag) => component.meta?.tags?.includes(tag) ?? false))
    : components;
};

export const getComponentsByNames = (names: string[]): RegistryItem[] => {
  const componentsMap = new Map(components.map((comp) => [comp.name, comp]));

  return names.map((name) => componentsMap.get(name)).filter((comp): comp is RegistryItem => comp !== undefined);
};

export const getAvailableTags = (selectedTags: RegistryTag[]): RegistryTag[] => {
  if (!selectedTags.length) return [];

  // Get all components that have all the selected tags
  const matchingComponents = components.filter((component) =>
    selectedTags.every((tag) => component.meta?.tags?.includes(tag) ?? false),
  );

  // Get all unique tags from the matching components
  const availableTags = new Set<RegistryTag>();
  matchingComponents.forEach((component) => {
    component.meta?.tags?.forEach((tag: RegistryTag) => {
      if (!selectedTags.includes(tag)) {
        availableTags.add(tag);
      }
    });
  });

  return Array.from(availableTags);
};

export const convertRegistryPaths = (content: string): string => {
  return content
    .replace(/@\/registry\/default\/ui/g, '@/components/ui')
    .replace(/@\/registry\/default\/compositions/g, '@/components')
    .replace(/@\/registry\/default\/hooks/g, '@/hooks')
    .replace(/@\/registry\/default\/lib/g, '@/lib');
};
