'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/registry/default/ui/button';
import { ScrollArea } from '@/registry/default/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/registry/default/ui/sheet';
import { siteConfig } from '@/config/site-config';
import { docsConfig } from '@/config/docs-config';
import { ModeToggle } from './mode-toggle';
import { Menu } from 'lucide-react';
import Logo from './Logo';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="px-6 h-14 items-center w-full container mx-auto flex md:hidden">
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden space-x-4"
          >
            <Menu />
            <Link href="/">
              <div
                className={cn(
                  buttonVariants({
                    variant: 'link',
                  }),
                  'px-0',
                )}
              >
                <Logo />
                <span className="sr-only">Home link</span>
              </div>
            </Link>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <nav className="flex items-center flex-1 space-x-2 justify-end">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-9 px-0',
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ModeToggle />
        </nav>
      </div>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" className="flex items-center justify-center p-2" onOpenChange={setOpen}>
          <Logo />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6 text-sm">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink href={item.href} onOpenChange={setOpen} className="text-muted-foreground">
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
