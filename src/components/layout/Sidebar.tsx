"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronsUpDown,
  MoreHorizontal,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useData } from "@/components/providers/DataProvider";
import Avatar from "@/components/ui/Avatar";
import { NAV_GROUPS, SETTINGS_NAV } from "@/lib/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { customers, deals } = useData();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  function getMeta(href: string, fallback?: number) {
    if (href === "/customers") return customers.length;
    if (href === "/deals") return deals.length;
    return fallback;
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/65 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col border-r border-line bg-[#0d0c0a]/95 backdrop-blur-xl transition-transform duration-300 ease-out lg:static lg:h-full lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(224,138,104,0.10),transparent_70%)]" />

        {/* Brand */}
        <div className="relative flex h-[68px] shrink-0 items-center justify-between px-5">
          <Link
            href="/"
            onClick={onClose}
            className="group flex min-w-0 items-center gap-3"
          >
            <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-[#f3bfa6] via-[#e08a68] to-[#a9503a] shadow-[0_8px_24px_-10px_rgba(224,138,104,0.85),inset_0_1px_0_rgba(255,255,255,0.45)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[19px] w-[19px] text-[#2a120a]"
                aria-hidden="true"
              >
                <path
                  d="M4.5 19h15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M5.5 19v-5.5a6.5 6.5 0 0 1 13 0V19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V5.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="4" r="1.2" fill="currentColor" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[14.5px] font-semibold tracking-[-0.01em] text-ink">
                Juragan Aqiqah
              </span>
              <span className="text-[9.5px] font-medium uppercase tracking-[0.17em] text-faint">
                Aqiqah CRM
              </span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onClose}
            className="icon-btn lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="sidebar-workspace px-3.5 pb-1 pt-1.5">
            <button
              type="button"
              className="group flex w-full items-center gap-2.5 rounded-xl border border-line bg-white/[0.028] p-2 text-left transition-colors hover:border-line-strong hover:bg-white/[0.05]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#402a23] to-[#241815] text-[10px] font-semibold text-accent-soft ring-1 ring-inset ring-white/10">
                HQ
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] font-medium text-ink">
                  Juragan Aqiqah HQ
                </span>
                <span className="block truncate text-[10px] text-faint">
                  Aqiqah &amp; catering
                </span>
              </span>
              <ChevronsUpDown
                size={13}
                className="shrink-0 text-faint transition-colors group-hover:text-muted"
              />
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-3.5 py-2.5">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-2.5 last:mb-0">
                <p className="mb-1 px-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-faint">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map(({ href, label, icon: Icon, meta, badge }) => {
                    const active = isActive(href);
                    const count = getMeta(href, meta);

                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`nav-link group !py-1.5 ${
                          active ? "nav-link-active" : ""
                        }`}
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.7}
                          className="nav-icon shrink-0 text-faint transition-colors group-hover:text-muted"
                        />
                        <span className="flex-1 truncate text-[12px]">
                          {label}
                        </span>
                        {badge ? (
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-wider ${
                              active
                                ? "bg-accent/15 text-accent-soft"
                                : "bg-violet/10 text-violet"
                            }`}
                          >
                            {badge}
                          </span>
                        ) : count !== undefined ? (
                          <span
                            className={`tabular rounded-md px-1.5 py-0.5 text-[9.5px] font-medium ${
                              active
                                ? "bg-accent/15 text-accent-soft"
                                : "bg-white/[0.04] text-faint"
                            }`}
                          >
                            {count}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="divider my-2" />

            <Link
              href={SETTINGS_NAV.href}
              onClick={onClose}
              aria-current={isActive("/settings") ? "page" : undefined}
              className={`nav-link group !py-1.5 ${
                isActive("/settings") ? "nav-link-active" : ""
              }`}
            >
              <Settings
                size={16}
                strokeWidth={1.7}
                className="nav-icon shrink-0 text-faint transition-colors group-hover:text-muted"
              />
              <span className="flex-1 text-[12px]">Settings</span>
            </Link>
          </nav>

          <div className="sidebar-copilot px-3.5 pb-2">
            <button
              type="button"
              className="group flex w-full items-center gap-2.5 rounded-xl border border-accent/20 bg-gradient-to-r from-accent/[0.11] to-transparent px-2.5 py-2 text-left transition-colors hover:border-accent/35 hover:from-accent/[0.16]"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 text-accent-soft">
                <Sparkles size={13} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-medium text-ink">
                  Ask Copilot
                </span>
                <span className="block truncate text-[9.5px] text-faint">
                  3 insights baru hari ini
                </span>
              </span>
              <ArrowUpRight
                size={13}
                className="shrink-0 text-faint transition-colors group-hover:text-accent-soft"
              />
            </button>
          </div>

          <div className="border-t border-line/80 p-3">
            <Link
              href="/settings"
              onClick={onClose}
              className="group flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-white/[0.035]"
            >
              <Avatar name="Adam Nurwahid" size="sm" tone="accent" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] font-medium text-ink">
                  Adam Nurwahid
                </span>
                <span className="block truncate text-[10px] text-faint">
                  Founder · Admin
                </span>
              </span>
              <MoreHorizontal
                size={14}
                className="text-faint transition-colors group-hover:text-muted"
              />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
