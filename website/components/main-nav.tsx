import { cn } from '../lib/utils';
import { buttonVariants } from '@/registry/default/ui/button';
import { Icons } from './icons';
import { siteConfig } from '@/config/site-config';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import Logo from './Logo';

export default function MainNav() {
  return (
    <div className="px-8 h-14 items-center w-full hidden md:flex">
      <div className="flex flex-1 items-center justify-between space-x-2">
        <Link href="/">
          <Logo />
          <span className="sr-only">Home link</span>
        </Link>
        <nav className="flex items-center">
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
    </div>
  );
}
