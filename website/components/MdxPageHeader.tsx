"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface MdxPageHeaderProps {
    title?: string;
    description?: string;
}

export function MdxPageHeader({ title, description }: MdxPageHeaderProps): React.ReactElement {
    const pathname = usePathname();
    const pageName = pathname ? pathname.split('/').pop() || '' : '';
    const pageTitle = title || pageName.charAt(0).toUpperCase() + pageName.slice(1);

    return (
        <div className="mb-8">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>Docs</span>
                <ChevronRight className='size-4' />
                <span>{pageTitle}</span>
            </div>
            <h1 className="font-heading mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
                {pageTitle}
            </h1>
            {description && (
                <p className="text-lg text-muted-foreground mt-2">
                    {description}
                </p>
            )}
        </div>
    );
}