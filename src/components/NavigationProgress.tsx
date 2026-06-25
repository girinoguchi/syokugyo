"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isInternalLink(href: string | null): boolean {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  return href.startsWith("/") || href.startsWith(window.location.origin);
}

export function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const done = window.setTimeout(() => setActive(false), 320);
    return () => window.clearTimeout(done);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!isInternalLink(href)) {
        return;
      }

      const url = new URL(href!, window.location.origin);
      if (url.pathname === pathname) {
        return;
      }

      setActive(true);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  if (!active) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-1 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="tc-nav-progress-bar h-full w-full bg-gradient-to-r from-telecareer-yellow via-telecareer-orange to-telecareer-coral" />
    </div>
  );
}
