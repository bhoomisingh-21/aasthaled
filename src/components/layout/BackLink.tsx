"use client";

import Link from "next/link";

type BackLinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
};

export function BackLink({ href, children = "Back", className = "" }: BackLinkProps) {
  return (
    <Link href={href} className={`back-link link-cine font-body ${className}`.trim()}>
      {children}
    </Link>
  );
}
