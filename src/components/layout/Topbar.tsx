"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { PAGE_NAMES } from "@/lib/navigation";

function getPageName(pathname: string) {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  const match = Object.keys(PAGE_NAMES).find(
    (key) => key !== "/" && pathname.startsWith(key)
  );
  return match ? PAGE_NAMES[match] : "Juragan Aqiqah";
}

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const pageName = getPageName(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-line/70 bg-[#0a0908]/75 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Buka menu"
          onClick={onMenuClick}
          className="icon-btn -ml-1 lg:hidden"
        >
          <Menu size={18} />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2 text-[12px]"
        >
          <span className="hidden text-faint sm:inline">Juragan Aqiqah</span>
          <ChevronRight
            size={12}
            className="hidden shrink-0 text-faint/60 sm:inline"
          />
          <span className="truncate font-medium text-ink">{pageName}</span>
          <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-line bg-white/[0.025] px-2 py-0.5 text-[10px] font-medium text-faint md:inline-flex">
            <span className="h-1 w-1 rounded-full bg-sage" />
            Live
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <label className="group relative hidden w-[290px] md:block xl:w-[340px]">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint transition-colors group-focus-within:text-accent-soft"
          />
          <input
            type="search"
            placeholder="Cari customer, pesanan, tiket..."
            aria-label="Cari di Juragan Aqiqah CRM"
            className="h-9 w-full rounded-xl border border-line bg-white/[0.03] pl-9 pr-[62px] text-[12.5px] text-ink outline-none transition-all placeholder:text-faint hover:border-line-strong hover:bg-white/[0.045] focus:border-accent/35 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(224,138,104,0.08)]"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </span>
        </label>

        <button type="button" aria-label="Cari" className="icon-btn md:hidden">
          <Search size={17} />
        </button>

        <Link
          href="/commerce"
          className="btn btn-primary ml-1 hidden h-9 px-3.5 sm:inline-flex"
        >
          <Plus size={15} strokeWidth={2.2} />
          <span className="hidden xl:inline">New order</span>
          <span className="xl:hidden">New</span>
        </Link>

        <button
          type="button"
          aria-label="Notifikasi"
          className="icon-btn relative"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

        <Link
          href="/settings"
          className="group flex items-center gap-2.5 rounded-xl border border-transparent p-1 pr-1.5 transition-colors hover:border-line hover:bg-white/[0.03] sm:pr-2"
        >
          <Avatar name="Adam Nurwahid" size="sm" tone="accent" />
          <span className="hidden flex-col leading-tight lg:flex">
            <span className="text-[12px] font-medium text-ink">
              Adam Nurwahid
            </span>
            <span className="text-[10.5px] text-faint">Founder</span>
          </span>
          <ChevronDown
            size={13}
            className="hidden text-faint transition-colors group-hover:text-muted lg:block"
          />
        </Link>
      </div>
    </header>
  );
}
