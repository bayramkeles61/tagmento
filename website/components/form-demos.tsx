'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/registry/default/ui/form';
import { Button } from '@/registry/default/ui/button';
import { z } from 'zod';
import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { toast } from '@/registry/default/ui/use-toast';
import { Tag, TagInput } from '../../packages/tagmento/src';
import { uuid } from '@/lib/utils';

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

const defaultTags: Tag[] = [
  { id: uuid(), text: 'Sports' },
  { id: uuid(), text: 'Programming' },
  { id: uuid(), text: 'Travel' },
  { id: uuid(), text: 'Music' },
  { id: uuid(), text: 'Food' },
];

export function ShadcnFormDemo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [tags, setTags] = React.useState<Tag[]>(defaultTags);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);
  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="z-10 w-full flex flex-col items-center text-center gap-5">
      <div id="try" className="w-full py-8">
        <div className="w-full relative my-4 flex flex-col space-y-2">
          <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Topics</FormLabel>
                      <FormControl className="w-full">
                        <TagInput
                          {...field}
                          placeholder="Enter a topic"
                          tags={tags}
                          className="max-w-[250px]"
                          setTags={(newTags) => {
                            setTags(newTags);
                            setValue('topics', newTags as [Tag, ...Tag[]]);
                          }}
                          activeTagIndex={activeTagIndex}
                          setActiveTagIndex={setActiveTagIndex}
                        />
                      </FormControl>
                      <FormDescription className="text-left">
                        These are the topics that you&apos;re interested in.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReactHookFormDemo() {
  const [tags, setTags] = React.useState<Tag[]>(defaultTags);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(null);
  const { control, handleSubmit, setValue } = useForm();

  // Using useController instead of Controller component
  const { field } = useController({
    name: 'tags',
    control,
  });

  function onSubmit(data: any) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <section className="z-10 w-full flex flex-col items-center text-center gap-5">
      <div id="try" className="w-full py-8">
        <div className="w-full relative my-4 flex flex-col space-y-2">
          <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TagInput
                {...field}
                placeholder="Enter a topic"
                tags={tags}
                className="max-w-[250px]"
                setTags={(newTags) => {
                  setTags(newTags);
                  setValue('topics', newTags as [Tag, ...Tag[]]);
                }}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
