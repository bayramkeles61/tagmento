"use client";

import { cn } from "@/registry/default/lib/utils";
import CopyButton from "./copy-button";
import { useRef, useEffect, useState } from "react";

export function CustomPre({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLPreElement>) {
    const preRef = useRef<HTMLPreElement>(null);
    const [codeContent, setCodeContent] = useState<string | null>(null);

    useEffect(() => {
        if (preRef.current) {
            const codeElement = preRef.current.querySelector("code");
            if (codeElement) {
                setCodeContent(codeElement.textContent);
            }
        }
    }, []);

    return (
        <div className="relative group mt-6">
            <pre ref={preRef} className={cn(className)} {...props}>
                {children}
            </pre>
            {codeContent && <CopyButton componentSource={codeContent} />}
        </div>
    );
}