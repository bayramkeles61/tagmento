"use client";

import { Label } from "@/registry/default/ui/label";
import { Tag, TagInput } from "tagmento";
import { useId, useState } from "react";

const tags = [
  {
    "id": "4008078267",
    "text": "Sports"
  },
  {
    "id": "3845028077",
    "text": "Programming"
  },
  {
    "id": "405323840",
    "text": "Travel"
  }
];

export default function Component() {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Bounce</Label>
      <TagInput
        id={id}
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
        }}
        animation={
          "bounce"
        }
        placeholder="Add a tag"
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  );
}
