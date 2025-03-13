import { siteConfig } from '@/config/site-config';

export function SiteFooter() {
  return (
    <footer className="py-6 px-8 container flex items-center justify-between gap-4 h-24">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{' '}
        <a
          href={siteConfig.links.site}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          {siteConfig.author}
        </a>
        . The source code is available on{' '}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
