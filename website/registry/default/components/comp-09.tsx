'use client';

import { Label } from '@/registry/default/ui/label';
import { Tag, TagInput } from 'tagmento';
import { useId, useState } from 'react';

const tags = [
  {
    id: '1',
    text: 'Tag 1',
  },
];

export default function Component() {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>xl</Label>
      <TagInput
        id={id}
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
        }}
        size={'xl'}
        placeholder="Add a tag"
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </div>
  );
}
