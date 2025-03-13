'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarNavItem } from 'types/nav';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/registry/default/ui/scroll-area';

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-96 hidden md:block fixed left-0 top-14 py-14 px-6">
      <ScrollArea
        style={{
          height: 'calc(100vh - 112px - 152px)',
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-foreground uppercase">{item.title}</h4>
            {item?.items?.length && <DocsSidebarNavItems items={item.items} pathname={pathname} />}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="ml-4">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline whitespace-nowrap text-sm',
              item.disabled && 'cursor-not-allowed opacity-60',
              pathname === item.href ? 'font-medium text-foreground ' : 'text-muted-foreground',
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-sm bg-[#adfa1d] px-1.5 py-0.5 text-[10px] leading-none text-black no-underline group-hover:no-underline">
                {item.label}
                New
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              'flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline',
              item.disabled && 'cursor-not-allowed opacity-60',
            )}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null;
}
