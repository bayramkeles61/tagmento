export const registryTags = [
  "input tags",
] as const;

export type RegistryTag = (typeof registryTags)[number];
