https://github.com/bayramkeles61/tagmento/assets/demo

[Tagmento](https://tagmento.com/) is a fully-featured tag input component designed for seamless integration into any project — styled your way or ready to adopt the sleek aesthetics of Shadcn's design system

## Features

- **Customizable**: Tagmento is unstyled by default, allowing you to easily style it to fit your design system.
- **Accessible**: Tagmento is built with accessibility in mind, ensuring that it is usable by everyone.
- **Easy to use**: Tagmento provides a simple and easy to use API that allows you to quickly integrate a tag input component into your project.

## Installation

To install Tagmento, run the command:

```bash
npm install tagmento
```

## Usage

Here's a sample implementation that initializes the component with a list of initial tags and suggestions list. Apart from this, there are multiple events, handlers for which need to be set.

The example below uses `tailwindcss` `@shadcn/ui` `tailwind-merge` `clsx`:

```tsx
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tag, TagInput } from '@/components/tag-input';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { toast } from '@/components/ui/use-toast';

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

export default function Hero() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [tags, setTags] = React.useState<Tag[]>([]);

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
    <section className="z-10 max-w-5xl w-full flex flex-col items-center text-center gap-5">
      <div className="z-10 w-full flex flex-col items-center text-center gap-5">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Shadcn Tag Input</h1>
        <p className="text-muted-foreground max-w-[450px]">
          An implementation of a Tag Input component built on top of Shadcn UI&apos;s input component.
        </p>
        <div className="flex gap-2 mt-1">
          <Link href="#try" className={`${buttonVariants({ variant: 'default', size: 'lg' })} min-w-[150px] shadow-sm`}>
            Try it out
          </Link>
          <Link
            href="https://github.com/JaleelB/shadcn-tag-input"
            className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} shadow-sm`}
          >
            Github
          </Link>
        </div>
      </div>

      <div id="try" className="w-full py-8">
        <div className="w-full relative my-4 flex flex-col space-y-2">
          <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Topics</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          placeholder="Enter a topic"
                          tags={tags}
                          // using Shadcn input styling
                          className="sm:min-w-[450px] flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          setTags={(newTags) => {
                            setTags(newTags);
                            setValue('topics', newTags as [Tag, ...Tag[]]);
                          }}
                        />
                      </FormControl>
                      <FormDescription>These are the topics that you&apos;re interested in.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

To create a detailed API Reference section in your README for the Tagmento tag input component, you can structure it similarly to the OTPInput example you provided. Here's a structured API reference that incorporates the properties and options of the Tagmento tag input:

---

## API Reference

### TagInput

The primary component for user interaction. Configure the tag input behavior and appearance using these props, and manage tag data dynamically.

#### Props

```typescript
type TagInputProps = {
  // Placeholder text for the input.
  placeholder?: string; // default: ""

  // Array of tags displayed as pre-selected.
  tags: Array<{ id: string; text: string }>; // default: []

  // Function to set the state of tags.
  setTags: React.Dispatch<React.SetStateAction<{ id: string; text: string }[]>>;

  // Enable or disable the autocomplete feature.
  enableAutocomplete?: boolean; // default: false

  // List of autocomplete options.
  autocompleteOptions?: Array<{ id: string; text: string }>; // default: []

  // Maximum number of tags allowed.
  maxTags?: number; // default: null

  // Minimum number of tags required.
  minTags?: number; // default: null

  // Make the input read-only.
  readOnly?: boolean; // default: false

  // Disable the input.
  disabled?: boolean; // default: false

  // Callback function when a tag is added.
  onTagAdd?: (tag: string) => void; // default: null

  // Callback function when a tag is removed.
  onTagRemove?: (tag: string) => void; // default: null

  // Allow duplicate tags.
  allowDuplicates?: boolean; // default: false

  // Maximum length of a tag.
  maxLength?: number; // default: null

  // Minimum length of a tag.
  minLength?: number; // default: null

  // Function to validate a tag.
  validateTag?: (tag: string) => boolean; // default: null

  // Character used to separate tags.
  delimiter?: Delimiter; // default: null

  // Show the count of tags.
  showCount?: boolean; // default: false

  // Placeholder text when tag limit is reached.
  placeholderWhenFull?: string; // default: ""

  // Sort tags alphabetically.
  sortTags?: boolean; // default: false

  // List of characters that can be used as delimiters.
  delimiterList?: string[]; // default: []

  // Truncate tag text to a certain length.
  truncate?: number; // default: null

  // Function to filter autocomplete options.
  autocompleteFilter?: (option: string) => boolean; // default: null

  // Layout direction of the tag inputs.
  direction?: 'row' | 'column'; // default: 'row'

  // A callback function that is called whenever the input value changes.
  onInputChange?: (value: string) => void; // default: null

  // A callback function that is used to render custom tag elements.
  customTagRenderer?: (tag: { id: string; text: string }) => React.ReactElement; // default: null

  // Function to be called when the input field gains focus.
  onFocus?: React.FocusEventHandler<HTMLInputElement>; // default: null

  // Function to be called when the input field loses focus.
  onBlur?: React.FocusEventHandler<HTMLInputElement>; // default: null

  // Only allow tags that are present in the autocomplete options.
  restrictTagsToAutocompleteOptions?: boolean; // default: false

  // A callback function to be called when a tag is clicked.
  onTagClick?: (tag: { id: string; text: string }) => void; // default: null

  // Enable drag and drop functionality.
  draggable?: boolean; // default: false

  // Position of the input field in relation to the tags.
  inputFieldPosition?: 'bottom' | 'top' | 'inline'; // default: 'bottom'

  // Show a button to clear all tags.
  clearAll?: boolean; // default: false

  // A callback function to be called when the clear all button is clicked.
  onClearAll?: () => void; // default: null

  // Additional props to be passed to the input field.
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // default: {}

  // Use a popover to display tags instead of inline.
  usePopoverForTags?: boolean; // default: false

  // A callback function to generate an id for a newly created tag
  generateTagId?: () => string; // default: utils/uuid
};
```

### Delimiter

Define the delimiters that can be used to separate tags within the input.

```typescript
enum Delimiter {
  Comma = ',',
  Enter = 'Enter',
}
```

## Documentation

You can find out more about the API and implementation in the [Documentation](https://tagmento.com/#setup).
