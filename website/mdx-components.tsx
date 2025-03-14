import type { MDXComponents } from 'mdx/types';
import { cn } from './lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/default/ui/table';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/default/ui/tabs';
import Image from 'next/image';
import { ComponentPreview } from '@/components/component-preview';
import { MdxPageHeader } from '@/components/MdxPageHeader';
import { CustomPre } from './components/CustomPre';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className={cn('font-heading mt-2 scroll-m-20 text-4xl font-bold', className)} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 className={cn('font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 className={cn('font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5 className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight', className)} {...props} />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6 className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight', className)} {...props} />
    ),
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={cn('rounded-md', className)} alt={alt} {...props} />
    ),
    hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-4 md:my-8" {...props} />,
    Table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
      <div className="rounded-md border">
        <Table className={cn('w-full min-h-[300px]', className)} {...props} />
      </div>
    ),
    TableCaption: ({ className, ...props }: React.ComponentProps<typeof TableCaption>) => (
      <TableCaption className={cn('font-medium text-center', className)} {...props} />
    ),
    TableHead: ({ className, ...props }: React.ComponentProps<typeof TableHead>) => (
      <TableHead className={cn('bg-muted/50', className)} {...props} />
    ),
    TableBody: ({ className, ...props }: React.ComponentProps<typeof TableBody>) => (
      <TableBody className={cn('divide-y divide-muted', className)} {...props} />
    ),
    TableRow: ({ className, ...props }: React.ComponentProps<typeof TableRow>) => (
      <TableRow className={cn('even:bg-muted', className)} {...props} />
    ),
    TableHeader: ({ className, ...props }: React.ComponentProps<typeof TableHeader>) => (
      <TableHeader
        className={cn(
          'border-b px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className,
        )}
        {...props}
      />
    ),
    TableCell: ({ className, ...props }: React.ComponentProps<typeof TableCell>) => (
      <TableCell
        className={cn(
          'border-b px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
          className,
        )}
        {...props}
      />
    ),
    Image,
    Step: ({ className, ...props }: React.ComponentProps<'h3'>) => (
      <h3 className={cn('font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
    ),
    Steps: ({ ...props }) => (
      <div className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]" {...props} />
    ),
    Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
      <Link className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
      <Link
        className={cn(
          'flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10',
          className,
        )}
        {...props}
      />
    ),
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs className={cn('relative mt-6 w-full', className)} {...props} />
    ),
    TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
      <TabsList className={cn('w-full justify-start rounded-none border-b bg-transparent p-0', className)} {...props} />
    ),
    TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          'relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none',
          className,
        )}
        {...props}
      />
    ),
    TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn('relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold', className)}
        {...props}
      />
    ),
    pre: CustomPre,
    MdxPageHeader,
    ComponentPreview,
    ...components,
  };
}
