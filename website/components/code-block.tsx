'use client';

import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { JSX, useLayoutEffect, useState } from 'react';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import type { BundledLanguage } from 'shiki/bundle/web';
import { codeToHast } from 'shiki/bundle/web';

export async function highlight(code: string, lang: BundledLanguage) {
  const hast = await codeToHast(code, {
    lang,
    theme: 'github-dark',
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}

type Props = {
  code: string | null;
  lang: BundledLanguage;
  initial?: JSX.Element;
  preHighlighted?: JSX.Element | null;
};

export default function CodeBlock({ code, lang, initial, preHighlighted }: Props) {
  const [highlighted, setHighlighted] = useState<JSX.Element | null>(null);

  useLayoutEffect(() => {
    if (preHighlighted || !code) return;

    let isMounted = true;
    highlight(code, lang).then((result) => {
      if (isMounted) setHighlighted(result);
    });

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  const content =
    preHighlighted ??
    highlighted ??
    initial ??
    (code ? null : <pre className="rounded-md bg-zinc-950 p-4">No code available</pre>);

  return content ? (
    <div className="[&_code]:font-mono [&_code]:text-[13px] [&_pre]:max-h-[450px] [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-zinc-950! [&_pre]:p-4 [&_pre]:leading-snug dark:[&_pre]:bg-zinc-900!">
      {content}
    </div>
  ) : (
    <pre className="rounded-md bg-zinc-950 p-4">Loading...</pre>
  );
}
