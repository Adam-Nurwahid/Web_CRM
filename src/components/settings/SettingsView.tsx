"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  CreditCard,
  KeyRound,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Avatar from "@/components/ui/Avatar";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: ShieldCheck },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onChange}
      className={`relative h-[22px] w-[38px] shrink-0 rounded-full border transition-all duration-200 ${
        enabled
          ? "border-accent/40 bg-accent/90 shadow-[0_0_16px_rgba(224,138,104,0.25)]"
          : "border-line bg-white/[0.06]"
      }`}
    >
      <span
        className={`absolute top-1/2 h-[16px] w-[16px] -translate-y-1/2 rounded-full bg-[#1c1815] shadow-sm transition-all duration-200 ${
          enabled ? "left-[18px]" : "left-[2px] bg-white/70"
        }`}
      />
    </button>
  );
}

function SectionCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="panel overflow-hidden">
      <div className="border-b border-line/60 px-5 py-4 sm:px-6">
        <h2 className="text-[13.5px] font-medium text-ink">{title}</h2>
        <p className="mt-1 text-[10.5px] text-faint">{description}</p>
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-2 border-t border-line/60 bg-black/10 px-5 py-3 sm:px-6">
          {footer}
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-muted">{label}</span>
        {hint && <span className="text-[9.5px] text-faint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-3.5">
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[10.5px] leading-relaxed text-faint">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default function SettingsView() {
  const [active, setActive] = useState<SectionId>("profile");
  const [saved, setSaved] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [notifications, setNotifications] = useState({
    deals: true,
    customers: true,
    digest: true,
    product: false,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  function handleSave() {
    setSaved(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Juragan Aqiqah · Settings"
        title="Settings"
        description="Sesuaikan identitas Juragan Aqiqah, preferensi notifikasi, dan detail akun kamu. Semua perubahan tersimpan secara lokal untuk preview ini."
        meta={
          <>
            <span className="chip">
              <span className="h-1 w-1 rounded-full bg-sage" />
              All changes saved
            </span>
            <span className="chip">Adam · Admin</span>
          </>
        }
        actions={
          <>
            <button type="button" className="btn btn-secondary">
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary min-w-[126px]"
            >
              {saved ? <Check size={15} /> : <Sparkles size={14} />}
              {saved ? "Saved" : "Save changes"}
            </button>
          </>
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-[224px_minmax(0,1fr)]">
        <nav className="panel h-fit p-2 lg:sticky lg:top-[92px]">
          <p className="px-3 pb-2 pt-2 text-[9.5px] font-medium uppercase tracking-[0.16em] text-faint">
            Preferences
          </p>
          <div className="space-y-0.5">
            {SECTIONS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium transition-all ${
                    isActive
                      ? "border border-line bg-white/[0.055] text-ink shadow-sm"
                      : "border border-transparent text-faint hover:bg-white/[0.03] hover:text-muted"
                  }`}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.7}
                    className={isActive ? "text-accent-soft" : "text-faint"}
                  />
                  {label}
                </button>
              );
            })}
          </div>
          <div className="mt-2 border-t border-line/60 p-3">
            <p className="text-[10px] leading-relaxed text-faint">
              Butuh bantuan setup?
            </p>
            <button
              type="button"
              className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-medium text-muted transition-colors hover:text-accent-soft"
            >
              Contact support
              <ArrowUpRight size={11} />
            </button>
          </div>
        </nav>

        <div key={active} className="fade-up min-w-0 space-y-5">
          {active === "profile" && (
            <>
              <section className="panel overflow-hidden">
                <div className="aurora relative h-28">
                  <div className="grid-fade absolute inset-0 opacity-60" />
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-3 font-display text-[64px] leading-none text-white/[0.035]"
                  >
                    JA
                  </span>
                </div>
                <div className="px-5 pb-5 sm:px-6">
                  <div className="-mt-9 flex flex-wrap items-end justify-between gap-3">
                    <Avatar
                      name="Adam Nurwahid"
                      size="xl"
                      tone="accent"
                      className="ring-4 ring-[#121110]"
                    />
                    <div className="flex items-center gap-2 pb-1">
                      <button type="button" className="btn btn-secondary h-8 text-[11px]">
                        Change photo
                      </button>
                      <span className="chip">
                        <span className="h-1 w-1 rounded-full bg-sage" />
                        Online
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-4 text-[17px] font-medium text-ink">
                    Adam Nurwahid
                  </h2>
                  <p className="mt-0.5 text-[11.5px] text-faint">
                    adam@juraganaqiqah.id · Founder & Operations
                  </p>
                </div>
              </section>

              <SectionCard
                title="Personal information"
                description="Detail ini muncul di seluruh workspace dan email tim aqiqah."
                footer={
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn btn-primary h-8 text-[11px]"
                  >
                    {saved ? <Check size={13} /> : null}
                    {saved ? "Saved" : "Save profile"}
                  </button>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name">
                    <input className="input" defaultValue="Adam Nurwahid" />
                  </Field>
                  <Field label="Email">
                    <input
                      className="input"
                      type="email"
                      defaultValue="adam@juraganaqiqah.id"
                    />
                  </Field>
                  <Field label="Role">
                    <select className="input cursor-pointer pr-8" defaultValue="admin">
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </Field>
                  <Field label="Timezone" hint="GMT+7">
                    <select
                      className="input cursor-pointer pr-8"
                      defaultValue="jakarta"
                    >
                      <option value="jakarta">Jakarta (WIB)</option>
                      <option value="singapore">Singapore (SGT)</option>
                      <option value="utc">UTC</option>
                    </select>
                  </Field>
                </div>
              </SectionCard>
            </>
          )}

          {active === "workspace" && (
            <>
              <SectionCard
                title="Workspace details"
                description="Identitas utama Juragan Aqiqah yang dilihat oleh seluruh tim."
                footer={
                  <button type="button" onClick={handleSave} className="btn btn-primary h-8 text-[11px]">
                    {saved ? <Check size={13} /> : null}
                    {saved ? "Saved" : "Save changes"}
                  </button>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Workspace name">
                    <input className="input" defaultValue="Juragan Aqiqah" />
                  </Field>
                  <Field label="Workspace URL" hint="juraganaqiqah.id">
                    <input className="input" defaultValue="juragan-aqiqah" />
                  </Field>
                  <Field label="Default currency">
                    <select className="input cursor-pointer pr-8" defaultValue="idr">
                      <option value="idr">IDR — Rupiah</option>
                      <option value="usd">USD — Dollar</option>
                      <option value="sgd">SGD — Singapore dollar</option>
                    </select>
                  </Field>
                  <Field label="Fiscal year">
                    <select className="input cursor-pointer pr-8" defaultValue="jan">
                      <option value="jan">January — December</option>
                      <option value="apr">April — March</option>
                    </select>
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                title="Appearance"
                description="Pilih suasana workspace. Tema Midnight dioptimalkan untuk fokus dan contrast."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      name: "Midnight",
                      description: "Warm dark · current",
                      active: true,
                      swatch: "from-[#1b1815] via-[#121110] to-[#0a0908]",
                    },
                    {
                      name: "Graphite",
                      description: "Neutral dark · soon",
                      active: false,
                      swatch: "from-[#1c1d20] via-[#131417] to-[#0b0c0d]",
                    },
                    {
                      name: "Sand",
                      description: "Warm light · soon",
                      active: false,
                      swatch: "from-[#efe9dd] via-[#e4dccd] to-[#d6ccb9]",
                    },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      disabled={!theme.active}
                      className={`group rounded-xl border p-2.5 text-left transition-all ${
                        theme.active
                          ? "border-accent/35 bg-accent/[0.04]"
                          : "border-line opacity-60"
                      }`}
                    >
                      <span
                        className={`block h-16 rounded-lg border border-black/20 bg-gradient-to-br p-2 ${theme.swatch}`}
                      >
                        <span className="block h-1.5 w-8 rounded-full bg-white/20" />
                        <span className="mt-3 block h-1 w-12 rounded-full bg-white/10" />
                        <span className="mt-1.5 block h-1 w-9 rounded-full bg-white/10" />
                      </span>
                      <span className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
                        <span>
                          <span className="block text-[11.5px] font-medium text-ink">
                            {theme.name}
                          </span>
                          <span className="block text-[9.5px] text-faint">
                            {theme.description}
                          </span>
                        </span>
                        {theme.active && (
                          <Check size={13} className="text-accent-soft" />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {active === "notifications" && (
            <SectionCard
              title="Notification preferences"
              description="Pilih update yang penting untukmu. Kamu bisa mengubahnya kapan saja."
            >
              <div className="divide-y divide-line/50">
                <SettingRow
                  title="Deal stage updates"
                  description="Saat deal berpindah stage atau mendekati target closing."
                >
                  <Toggle
                    label="Deal stage updates"
                    enabled={notifications.deals}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        deals: !prev.deals,
                      }))
                    }
                  />
                </SettingRow>
                <SettingRow
                  title="New customer assigned"
                  description="Notifikasi ketika customer baru ditugaskan ke kamu."
                >
                  <Toggle
                    label="New customer assigned"
                    enabled={notifications.customers}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        customers: !prev.customers,
                      }))
                    }
                  />
                </SettingRow>
                <SettingRow
                  title="Weekly performance digest"
                  description="Ringkasan pipeline dan revenue setiap Senin pagi."
                >
                  <Toggle
                    label="Weekly performance digest"
                    enabled={notifications.digest}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        digest: !prev.digest,
                      }))
                    }
                  />
                </SettingRow>
                <SettingRow
                  title="Product news & beta features"
                  description="Update produk dan akses awal ke fitur Copilot terbaru."
                >
                  <Toggle
                    label="Product news"
                    enabled={notifications.product}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        product: !prev.product,
                      }))
                    }
                  />
                </SettingRow>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-black/20 px-3.5 py-3">
                <div>
                  <p className="text-[11px] font-medium text-ink">
                    Delivery channel
                  </p>
                  <p className="mt-0.5 text-[10px] text-faint">
                    Dikirim ke adam@juraganaqiqah.id
                  </p>
                </div>
                <span className="chip">Email</span>
              </div>
            </SectionCard>
          )}

          {active === "billing" && (
            <>
              <section className="panel aurora overflow-hidden p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-[10px] font-medium text-accent-soft">
                      <Sparkles size={11} />
                      Scale plan
                    </span>
                    <p className="mt-4 font-display text-[34px] leading-none text-ink">
                      $49
                      <span className="ml-1 font-sans text-[12px] font-normal text-faint">
                        / month
                      </span>
                    </p>
                    <p className="mt-2 text-[11px] text-faint">
                      Renews Nov 12, 2026 · Billed annually
                    </p>
                  </div>
                  <button type="button" className="btn btn-primary">
                    Manage plan
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-black/20 p-3.5">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="text-muted">Team seats</span>
                      <span className="tabular text-ink">8 / 10</span>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-accent/70 to-accent-soft" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-black/20 p-3.5">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="text-muted">AI credits</span>
                      <span className="tabular text-ink">6,800 / 10,000</span>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet/70 to-violet" />
                    </div>
                  </div>
                </div>
              </section>

              <SectionCard
                title="Billing history"
                description="Invoice terbaru untuk workspace Juragan Aqiqah."
              >
                <div className="divide-y divide-line/50">
                  {[
                    { date: "Oct 1, 2026", amount: "Rp 749.000", status: "Paid" },
                    { date: "Sep 1, 2026", amount: "Rp 749.000", status: "Paid" },
                  ].map((invoice) => (
                    <div
                      key={invoice.date}
                      className="flex items-center justify-between gap-3 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.03] text-faint">
                          <CreditCard size={14} />
                        </span>
                        <div>
                          <p className="text-[11.5px] font-medium text-ink">
                            {invoice.date}
                          </p>
                          <p className="text-[9.5px] text-faint">
                            Scale plan · annual
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="chip !text-[9px]">{invoice.status}</span>
                        <span className="tabular text-[11px] text-muted">
                          {invoice.amount}
                        </span>
                        <button
                          type="button"
                          className="text-[10px] font-medium text-faint transition-colors hover:text-ink"
                        >
                          PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {active === "security" && (
            <>
              <SectionCard
                title="Password"
                description="Gunakan minimal 12 karakter dengan kombinasi yang kuat."
                footer={
                  <button type="button" onClick={handleSave} className="btn btn-primary h-8 text-[11px]">
                    {saved ? <Check size={13} /> : null}
                    {saved ? "Updated" : "Update password"}
                  </button>
                }
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Current password">
                    <input className="input" type="password" placeholder="••••••••••" />
                  </Field>
                  <Field label="New password">
                    <input className="input" type="password" placeholder="••••••••••" />
                  </Field>
                </div>
              </SectionCard>

              <SectionCard
                title="Access & sessions"
                description="Kelola keamanan akun dan perangkat yang terhubung."
              >
                <SettingRow
                  title="Two-factor authentication"
                  description="Tambahkan lapisan keamanan ekstra saat login."
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-medium ${
                        twoFactor ? "text-sage" : "text-faint"
                      }`}
                    >
                      {twoFactor ? "Enabled" : "Disabled"}
                    </span>
                    <Toggle
                      label="Two-factor authentication"
                      enabled={twoFactor}
                      onChange={() => setTwoFactor((prev) => !prev)}
                    />
                  </div>
                </SettingRow>

                <div className="mt-2 rounded-xl border border-line bg-black/20 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[0.03] text-muted">
                        <KeyRound size={15} />
                      </span>
                      <div>
                        <p className="text-[11.5px] font-medium text-ink">
                          MacBook Pro · Chrome
                        </p>
                        <p className="mt-0.5 text-[9.5px] text-faint">
                          Jakarta, ID · Active now
                        </p>
                      </div>
                    </div>
                    <span className="chip !border-sage/20 !bg-sage/[0.08] !text-sage">
                      This device
                    </span>
                  </div>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

