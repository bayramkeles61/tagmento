export interface ComponentCategory {
  slug: string;
  name: string;
  components: { name: string }[];
  isNew?: boolean;
}

export const categories: ComponentCategory[] = [
  {
    slug: "input-tags",
    name: "Input Tags",
    components: [
      { name: "comp-01" },
      { name: "comp-02" },
      { name: "comp-03" },
      { name: "comp-04" },
      { name: "comp-05" },
      { name: "comp-06" },
      { name: "comp-07" },
      { name: "comp-08" },
      { name: "comp-09" },
      { name: "comp-10" },
      { name: "comp-11" },
      { name: "comp-12" },
      { name: "comp-13" },
      { name: "comp-14" },
      { name: "comp-15" },
      { name: "comp-16" },
      { name: "comp-17" },
      { name: "comp-18" },
      { name: "comp-19" },
      { name: "comp-20" },
      { name: "comp-21" },
      { name: "comp-22" },
      { name: "comp-23" },
      { name: "comp-24" },
      { name: "comp-25" },
      { name: "comp-26" },
      { name: "comp-27" },
      { name: "comp-28" },
      { name: "comp-29" },
    ],
  },
];

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}
