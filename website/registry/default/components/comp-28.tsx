'use client';

import { Tag, TagInput } from 'tagmento';
import { z } from 'zod';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useId } from 'react';
import { toast } from 'sonner';
import { uuid } from '@/lib/utils';
import { Button } from '../ui/button';
import { Label } from '@/registry/default/ui/label';

const FormSchema = z.object({
  topics: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .min(1, 'Please select at least one topic'),
});

type FormValues = z.infer<typeof FormSchema>;

const defaultTags: Tag[] = [];

export default function Component() {
  const id = useId();
  const [tags, setTags] = React.useState<Tag[]>(defaultTags);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topics: defaultTags,
    },
  });

  const { field } = useController({
    name: 'topics',
    control,
  });

  function onSubmit(data: FormValues) {
    toast('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function onError(errors: any) {
    toast.error('Form contains errors', {
      description: errors.topics?.message || 'Please select at least one topic',
    });
  }

  // Function to clear all tags
  const clearAllTags = () => {
    setTags([]);
    setValue('topics', []);
  };

  const handleTagsChange = (newTags: React.SetStateAction<Tag[]>) => {
    const updatedTags =
      typeof newTags === 'function'
        ? newTags(tags)
        : newTags.map((tag) => {
            if (!tag.id) {
              return { ...tag, id: uuid() };
            }
            return tag;
          });

    setTags(updatedTags);
    setValue('topics', updatedTags);
  };

  return (
    <section className="z-10 w-full flex flex-col items-center text-center gap-5">
      <div className="w-full min-w-[350px]">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full max-w-md">
          <div className="*:not-first:mt-2 flex items-start flex-col">
            <Label htmlFor={id}>Topics</Label>
            <TagInput
              {...field}
              placeholder="Enter a topic"
              tags={tags}
              className="max-w-full"
              setTags={handleTagsChange}
              createTagOnBlur={true}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
            />

            {errors.topics && <p className="text-destructive text-sm mt-1">{errors.topics.message}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button type="button" variant={'destructive'} onClick={clearAllTags}>
              Clear
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
