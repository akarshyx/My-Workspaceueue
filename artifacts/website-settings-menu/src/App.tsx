import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Cloud,
  Copy,
  Database,
  ExternalLink,
  FileCode2,
  Folder,
  GitBranch,
  Globe2,
  KeyRound,
  LayoutGrid,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  Route,
  Switch,
  Router as WouterRouter,
  useLocation,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState('Files');
  const [activeNav, setActiveNav] = useState('Overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState('');

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  return (
    <div className="noise-layer app-shell min-h-[100dvh] text-foreground">
      <div className="flex min-h-[100dvh]">
        <Sidebar
          activeNav={activeNav}
          onNav={(item) => {
            setActiveNav(item);
            setMobileNavOpen(false);
            if (item !== 'Overview') notify(`${item} view is ready to explore`);
          }}
          settingsOpen={settingsOpen}
          onSettings={() => setSettingsOpen(true)}
          mobileOpen={mobileNavOpen}
        />

        <div className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-border/70 bg-[hsl(var(--background)/.72)] px-5 backdrop-blur-md sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-foreground/30 hover:text-foreground md:hidden"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                data-testid="button-toggle-mobile-navigation"
                aria-label="Toggle navigation"
              >
                <Menu size={18} />
              </button>
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <span className="mono-label text-muted-foreground">workspace</span>
                <span className="text-border">/</span>
                <span className="font-semibold text-foreground" data-testid="text-workspace-name">northstar</span>
              </div>
              <div className="sm:hidden">
                <p className="mono-label text-muted-foreground">workspace</p>
                <p className="text-sm font-extrabold tracking-tight">northstar</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-foreground/30 hover:text-foreground md:flex"
                onClick={() => notify('Search is ready — try a project file')}
                data-testid="button-search-workspace"
              >
                <Search size={15} />
                Search workspace
                <span className="ml-3 rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px]">⌘ K</span>
              </button>
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                onClick={() => {
                  setSettingsOpen(true);
                  setActiveSetting('Notifications');
                }}
                data-testid="button-open-notifications"
                aria-label="Open notifications"
              >
                <Bell size={17} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-primary px-2.5 py-2 text-primary-foreground transition hover:bg-primary/90 sm:pl-2 sm:pr-3"
                onClick={() => notify('Account menu opened')}
                data-testid="button-open-account-menu"
                aria-label="Open account menu"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--accent))] text-xs font-extrabold text-primary">AS</span>
                <span className="hidden text-xs font-bold sm:inline">Avery Singh</span>
                <ChevronDown size={14} className="hidden opacity-70 sm:block" />
              </button>
            </div>
          </header>

          <main className="mx-auto max-w-[1440px] px-5 pb-14 pt-8 sm:px-8 sm:pt-10 lg:px-12">
            <div className="mb-8 flex items-end justify-between gap-5 reveal">
              <div>
                <p className="mono-label mb-3 text-[hsl(var(--chart-2))]">Tuesday, October 17, 2024</p>
                <h1 className="display-type max-w-2xl text-4xl font-extrabold leading-[.98] text-foreground sm:text-5xl lg:text-[4.4rem]">
                  Make something<br className="hidden sm:block" /> worth returning to.
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-[15px]">
                  Your projects are in good shape. Here is the signal from the things you care about today.
                </p>
              </div>
              <button
                type="button"
                className="group hidden items-center gap-2 pb-1 text-xs font-bold text-foreground transition hover:text-[hsl(var(--chart-2))] sm:flex"
                onClick={() => notify('Opening project activity')}
                data-testid="button-view-all-activity"
              >
                View all activity <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
              <div className="relative min-h-[320px] overflow-hidden rounded-[1.45rem] bg-primary p-6 text-primary-foreground shadow-[0_20px_60px_-28px_hsl(var(--primary))] reveal reveal-delay-1 sm:p-9">
                <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[30px] border-[hsl(var(--accent)/.18)]" />
                <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full border border-[hsl(var(--accent)/.28)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-[hsl(var(--accent))]">
                      <span className="status-dot h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                      <span className="mono-label">live project</span>
                    </div>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/70 transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                      onClick={() => notify('Project options opened')}
                      data-testid="button-project-options"
                      aria-label="Project options"
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                  <div className="mt-20">
                    <div className="mb-3 flex items-center gap-2 text-primary-foreground/55">
                      <Folder size={15} />
                      <span className="font-mono text-[11px]">/projects/northstar-web</span>
                    </div>
                    <h2 className="display-type text-3xl font-extrabold tracking-tight sm:text-4xl">Northstar web</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-primary-foreground/65">A quieter way to plan, ship, and share what is next.</p>
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-primary-foreground/15 pt-4 text-xs text-primary-foreground/65">
                    <span className="flex items-center gap-1.5"><GitBranch size={14} /> main</span>
                    <span className="h-1 w-1 rounded-full bg-primary-foreground/30" />
                    <span>Updated 12 min ago</span>
                    <button
                      type="button"
                      className="ml-auto flex items-center gap-1 font-bold text-[hsl(var(--accent))] transition hover:text-primary-foreground"
                      onClick={() => notify('Opening Northstar web')}
                      data-testid="button-open-project"
                    >
                      Open project <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <SignalCard
                  icon={Cloud}
                  eyebrow="deployments"
                  value="Healthy"
                  detail="Last deploy passed 18 min ago"
                  tone="teal"
                  testId="card-deployment-health"
                  onClick={() => notify('Deployment history opened')}
                />
                <SignalCard
                  icon={Activity}
                  eyebrow="this week"
                  value="14 commits"
                  detail="4 more than your weekly average"
                  tone="gold"
                  testId="card-weekly-commits"
                  onClick={() => notify('Commit activity opened')}
                />
              </div>
            </section>

            <section className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,.9fr)]">
              <div className="rounded-[1.45rem] border border-border bg-card p-6 reveal reveal-delay-2 sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mono-label text-muted-foreground">quick access</p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight">Keep the important close.</h2>
                  </div>
                  <Sparkles size={19} className="text-[hsl(var(--chart-3))]" />
                </div>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <QuickAction icon={FileCode2} label="Browse files" detail="24 files changed" onClick={() => { setActiveNav('Files'); notify('Files view is ready to explore'); }} testId="button-browse-files" />
                  <QuickAction icon={UsersRound} label="Invite a teammate" detail="3 seats available" onClick={() => { setSettingsOpen(true); setActiveSetting('Access'); }} testId="button-invite-teammate" />
                  <QuickAction icon={Globe2} label="Manage domains" detail="northstar.site" onClick={() => { setSettingsOpen(true); setActiveSetting('Domains'); }} testId="button-manage-domains" />
                  <QuickAction icon={CircleHelp} label="Read the guide" detail="8 min · Getting started" onClick={() => notify('Guide opened in a new view')} testId="button-read-guide" />
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-border bg-card p-6 reveal reveal-delay-3 sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mono-label text-muted-foreground">recent activity</p>
                    <h2 className="mt-2 text-xl font-extrabold tracking-tight">The quiet signal.</h2>
                  </div>
                  <button
                    type="button"
                    className="text-muted-foreground transition hover:text-foreground"
                    onClick={() => notify('Showing full activity')}
                    data-testid="button-expand-activity"
                    aria-label="Expand activity"
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="mt-5 space-y-4">
                  <ActivityRow avatar="AS" title="Avery merged a pull request" detail="Refine project handoff" time="12 min" testId="activity-merge" onClick={() => notify('Pull request details opened')} />
                  <ActivityRow avatar="ML" title="Mina joined the workspace" detail="Access · northstar-web" time="2 hr" testId="activity-join" onClick={() => { setSettingsOpen(true); setActiveSetting('Access'); }} />
                  <ActivityRow avatar="CI" title="Build completed successfully" detail="Production · #1842" time="Yesterday" testId="activity-build" onClick={() => notify('Build details opened')} />
                </div>
              </div>
            </section>

            <section className="mt-4 flex flex-col gap-5 rounded-[1.45rem] border border-border bg-[hsl(var(--secondary)/.55)] p-6 reveal reveal-delay-4 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card text-[hsl(var(--chart-3))] shadow-sm"><ShieldCheck size={20} /></div>
                <div>
                  <p className="font-bold">Your workspace is protected</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">Two-factor authentication is active for every admin.</p>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 self-start text-xs font-extrabold text-foreground transition hover:text-[hsl(var(--chart-2))] sm:self-auto"
                onClick={() => { setSettingsOpen(true); setActiveSetting('Account'); }}
                data-testid="button-review-security"
              >
                Review security <ArrowUpRight size={15} />
              </button>
            </section>
          </main>
        </div>

        {settingsOpen && (
          <SettingsPanel
            activeSetting={activeSetting}
            onSelect={setActiveSetting}
            onClose={() => setSettingsOpen(false)}
            notify={notify}
          />
        )}
      </div>
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-2xl settings-panel-enter" role="status" data-testid="status-toast">
          <Check size={15} className="text-[hsl(var(--accent))]" /> {toast}
        </div>
      )}
    </div>
  );
}

type NavItem = { label: string; icon: LucideIcon };
const navItems: NavItem[] = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Files', icon: Folder },
  { label: 'Activity', icon: Activity },
];

function Sidebar({
  activeNav,
  onNav,
  settingsOpen,
  onSettings,
  mobileOpen,
}: {
  activeNav: string;
  onNav: (item: string) => void;
  settingsOpen: boolean;
  onSettings: () => void;
  mobileOpen: boolean;
}) {
  return (
    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-[268px] shrink-0 flex-col bg-sidebar px-5 py-6 text-sidebar-foreground transition-transform duration-300 md:sticky md:top-0 md:h-[100dvh] md:translate-x-0`}>
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[hsl(var(--accent))] text-primary">
          <SlidersHorizontal size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[15px] font-extrabold tracking-[-.04em]">understory</p>
          <p className="mono-label mt-0.5 text-sidebar-foreground/45">workspace OS</p>
        </div>
      </div>
      <div className="my-8 h-px bg-sidebar-border" />
      <div className="mb-3 px-2 mono-label text-sidebar-foreground/40">workspace</div>
      <nav className="space-y-1" aria-label="Main navigation">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeNav === label ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'}`}
            onClick={() => onNav(label)}
            data-testid={`button-nav-${label.toLowerCase()}`}
          >
            <Icon size={17} strokeWidth={activeNav === label ? 2.4 : 1.8} />
            {label}
            {label === 'Activity' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="mb-4 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
          <div className="mb-3 flex items-center justify-between"><span className="mono-label text-sidebar-foreground/45">plan</span><span className="rounded-md bg-[hsl(var(--accent)/.18)] px-1.5 py-1 text-[10px] font-bold text-[hsl(var(--accent))]">studio</span></div>
          <div className="mb-2 flex justify-between text-xs"><span className="text-sidebar-foreground/60">Storage</span><span className="font-mono text-sidebar-foreground/75">62%</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-sidebar-border"><div className="h-full w-[62%] rounded-full bg-[hsl(var(--accent))]" /></div>
          <button type="button" className="mt-3 text-xs font-bold text-[hsl(var(--accent))] transition hover:text-sidebar-foreground" onClick={() => onNav('Billing')} data-testid="button-view-plan">View plan <ArrowUpRight size={12} className="ml-1 inline" /></button>
        </div>
        <button
          type="button"
          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-sm font-bold transition ${settingsOpen ? 'border-[hsl(var(--accent)/.65)] bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]' : 'border-sidebar-border text-sidebar-foreground hover:border-[hsl(var(--accent)/.45)] hover:bg-sidebar-accent'}`}
          onClick={onSettings}
          data-testid="button-open-settings"
        >
          <Settings2 size={18} />
          Settings
          <span className="ml-auto text-[10px] font-medium text-sidebar-foreground/35">⌘ ,</span>
        </button>
      </div>
    </aside>
  );
}

function SignalCard({ icon: Icon, eyebrow, value, detail, tone, onClick, testId }: { icon: LucideIcon; eyebrow: string; value: string; detail: string; tone: 'teal' | 'gold'; onClick: () => void; testId: string }) {
  return (
    <button type="button" className="group flex min-h-[154px] flex-col justify-between rounded-[1.45rem] border border-border bg-card p-6 text-left transition duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-lg sm:p-7" onClick={onClick} data-testid={testId}>
      <div className="flex items-center justify-between">
        <span className="mono-label text-muted-foreground">{eyebrow}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone === 'teal' ? 'bg-[hsl(var(--chart-2)/.13)] text-[hsl(var(--chart-2))]' : 'bg-[hsl(var(--accent)/.22)] text-[hsl(var(--chart-3))]'}`}><Icon size={16} /></span>
      </div>
      <div><p className="text-2xl font-extrabold tracking-tight" data-testid={`text-${testId}-value`}>{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
    </button>
  );
}

function QuickAction({ icon: Icon, label, detail, onClick, testId }: { icon: LucideIcon; label: string; detail: string; onClick: () => void; testId: string }) {
  return (
    <button type="button" className="group flex items-center gap-3 rounded-xl border border-border bg-background/70 p-3 text-left transition hover:border-foreground/25 hover:bg-card" onClick={onClick} data-testid={testId}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition group-hover:bg-[hsl(var(--accent))]"><Icon size={16} /></span>
      <span className="min-w-0"><span className="block truncate text-xs font-bold">{label}</span><span className="mt-1 block truncate text-[11px] text-muted-foreground">{detail}</span></span>
      <ArrowUpRight size={14} className="ml-auto shrink-0 text-muted-foreground transition group-hover:text-foreground" />
    </button>
  );
}

function ActivityRow({ avatar, title, detail, time, testId, onClick }: { avatar: string; title: string; detail: string; time: string; testId: string; onClick: () => void }) {
  return (
    <button type="button" className="flex w-full items-center gap-3 text-left transition hover:opacity-75" onClick={onClick} data-testid={testId}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-[9px] font-bold text-secondary-foreground">{avatar}</span>
      <span className="min-w-0 flex-1"><span className="block truncate text-xs font-bold">{title}</span><span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{detail}</span></span>
      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{time}</span>
    </button>
  );
}

const settingItems = [
  { label: 'Files', icon: Folder, description: 'Structure and storage' },
  { label: 'Git', icon: GitBranch, description: 'Branches and commits' },
  { label: 'Access', icon: UsersRound, description: 'People and permissions' },
  { label: 'Notifications', icon: Bell, description: 'Signals and alerts' },
  { label: 'Domains', icon: Globe2, description: 'Web addresses' },
  { label: 'Account', icon: UserRound, description: 'Profile and security' },
];

function SettingsPanel({ activeSetting, onSelect, onClose, notify }: { activeSetting: string; onSelect: (item: string) => void; onClose: () => void; notify: (message: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-primary/20 backdrop-blur-[2px]" onClick={onClose} data-testid="button-dismiss-settings-overlay">
      <section className="settings-panel-enter settings-scroll flex h-full w-full max-w-[620px] overflow-y-auto border-l border-border bg-card shadow-[-20px_0_80px_-40px_hsl(var(--primary))]" onClick={(event) => event.stopPropagation()} aria-label="Workspace settings">
        <div className="flex min-h-full w-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5 sm:px-8">
            <div><p className="mono-label text-[hsl(var(--chart-2))]">control center</p><h2 className="mt-1 text-xl font-extrabold tracking-tight">Settings</h2></div>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={onClose} data-testid="button-close-settings" aria-label="Close settings"><X size={17} /></button>
          </div>
          <div className="flex flex-1 flex-col md:flex-row">
            <div className="border-b border-border p-4 md:w-[218px] md:shrink-0 md:border-b-0 md:border-r md:p-5">
              <p className="mb-2 px-2 mono-label text-muted-foreground">project controls</p>
              <div className="grid grid-cols-2 gap-1 md:grid-cols-1">
                {settingItems.map(({ label, icon: Icon, description }) => (
                  <button key={label} type="button" className={`group flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition ${activeSetting === label ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`} onClick={() => onSelect(label)} data-testid={`button-setting-${label.toLowerCase()}`}>
                    <Icon size={16} className={activeSetting === label ? 'text-[hsl(var(--accent))]' : ''} />
                    <span className="min-w-0"><span className="block text-xs font-bold">{label}</span><span className={`hidden truncate text-[10px] md:block ${activeSetting === label ? 'text-primary-foreground/55' : 'text-muted-foreground'}`}>{description}</span></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="min-w-0 flex-1 p-6 sm:p-8">
              <SettingContent activeSetting={activeSetting} notify={notify} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SettingContent({ activeSetting, notify }: { activeSetting: string; notify: (message: string) => void }) {
  if (activeSetting === 'Files') return <FilesSetting notify={notify} />;
  if (activeSetting === 'Git') return <GitSetting notify={notify} />;
  if (activeSetting === 'Access') return <AccessSetting notify={notify} />;
  if (activeSetting === 'Notifications') return <NotificationsSetting notify={notify} />;
  if (activeSetting === 'Domains') return <DomainsSetting notify={notify} />;
  return <AccountSetting notify={notify} />;
}

function SettingHeader({ kicker, title, detail }: { kicker: string; title: string; detail: string }) {
  return <div className="mb-7"><p className="mono-label text-[hsl(var(--chart-2))]">{kicker}</p><h3 className="mt-2 text-2xl font-extrabold tracking-tight">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p></div>;
}

function FilesSetting({ notify }: { notify: (message: string) => void }) {
  const files = [{ name: 'src', detail: 'folder · 12 items', icon: Folder }, { name: 'package.json', detail: 'updated 12 min ago', icon: FileCode2 }, { name: 'README.md', detail: 'updated yesterday', icon: FileCode2 }];
  return <><SettingHeader kicker="project controls / files" title="Files" detail="Keep the shape of your project clear. Browse the files that make Northstar web feel like yours." /><div className="space-y-2">{files.map(({ name, detail, icon: Icon }) => <button type="button" key={name} className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition hover:border-foreground/25 hover:bg-muted" onClick={() => notify(`${name} opened`)} data-testid={`button-file-${name.replace('.', '-')}`}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground"><Icon size={16} /></span><span className="flex-1"><span className="block text-xs font-bold">{name}</span><span className="mt-1 block text-[11px] text-muted-foreground">{detail}</span></span><ExternalLink size={14} className="text-muted-foreground" /></button>)}</div><button type="button" className="mt-5 flex items-center gap-2 text-xs font-bold text-[hsl(var(--chart-2))]" onClick={() => notify('File browser opened')} data-testid="button-open-file-browser"><Folder size={15} /> Open file browser <ArrowUpRight size={14} /></button></>;
}

function GitSetting({ notify }: { notify: (message: string) => void }) {
  return <><SettingHeader kicker="project controls / git" title="Git" detail="A clean branch is a calm mind. See where the project is pointed and what is ready to move." /><div className="rounded-xl border border-border bg-secondary/60 p-4"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm font-bold"><GitBranch size={16} className="text-[hsl(var(--chart-2))]" /> main</span><span className="rounded-md bg-[hsl(var(--chart-2)/.14)] px-2 py-1 text-[10px] font-bold text-[hsl(var(--chart-2))]">up to date</span></div><div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4"><div><p className="mono-label text-muted-foreground">ahead</p><p className="mt-1 text-xl font-extrabold">0</p></div><div><p className="mono-label text-muted-foreground">behind</p><p className="mt-1 text-xl font-extrabold">0</p></div></div></div><button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground transition hover:bg-primary/90" onClick={() => notify('Git history opened')} data-testid="button-view-git-history">View git history <ArrowUpRight size={14} /></button></>;
}

function AccessSetting({ notify }: { notify: (message: string) => void }) {
  const people = [{ initials: 'AS', name: 'Avery Singh', role: 'Owner' }, { initials: 'ML', name: 'Mina Lee', role: 'Editor' }, { initials: 'JR', name: 'Jon Reyes', role: 'Viewer' }];
  return <><SettingHeader kicker="project controls / access" title="Access" detail="Choose who can shape this workspace. You have 3 seats available on your Studio plan." /><div className="space-y-2">{people.map((person) => <div key={person.name} className="flex items-center gap-3 rounded-xl border border-border p-3" data-testid={`row-member-${person.initials}`}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary font-mono text-[10px] font-bold">{person.initials}</span><span className="flex-1"><span className="block text-xs font-bold">{person.name}</span><span className="mt-1 block text-[11px] text-muted-foreground">{person.role}</span></span><button type="button" className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => notify(`${person.name}'s permissions opened`)} data-testid={`button-member-${person.initials}`} aria-label={`Manage ${person.name}`}><MoreHorizontal size={16} /></button></div>)}</div><button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-xs font-bold transition hover:border-foreground/30 hover:bg-muted" onClick={() => notify('Invite link copied to clipboard')} data-testid="button-send-invite"><Plus size={15} /> Invite a teammate</button></>;
}

function NotificationsSetting({ notify }: { notify: (message: string) => void }) {
  const [deployments, setDeployments] = useState(true);
  const [mentions, setMentions] = useState(true);
  return <><SettingHeader kicker="project controls / notifications" title="Notifications" detail="Only the signals worth interrupting you for. Change these anytime." /><div className="space-y-2">{[['Deployments', 'When a build finishes or needs attention', deployments, setDeployments], ['Mentions', 'When someone asks for your eye', mentions, setMentions]].map(([label, detail, checked, setChecked]) => <div className="flex items-center gap-3 rounded-xl border border-border p-4" key={label as string}><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary"><Bell size={16} /></span><span className="flex-1"><span className="block text-xs font-bold">{label as string}</span><span className="mt-1 block text-[11px] leading-4 text-muted-foreground">{detail as string}</span></span><button type="button" role="switch" aria-checked={checked as boolean} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-primary' : 'bg-muted'}`} onClick={() => { (setChecked as (value: boolean) => void)(!(checked as boolean)); notify(`${label as string} notifications ${(checked as boolean) ? 'paused' : 'enabled'}`); }} data-testid={`switch-notifications-${(label as string).toLowerCase()}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-[hsl(var(--accent))] transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-xl bg-[hsl(var(--chart-2)/.09)] p-3 text-xs text-[hsl(var(--chart-2))]"><Check size={15} /> Email digest is set for Mondays at 9:00.</div></>;
}

function DomainsSetting({ notify }: { notify: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  const copyDomain = () => { setCopied(true); notify('Domain copied to clipboard'); window.setTimeout(() => setCopied(false), 1800); };
  return <><SettingHeader kicker="project controls / domains" title="Domains" detail="Your project has a place to live. Connect a domain or keep the understory address while you build." /><div className="rounded-xl border border-border bg-secondary/60 p-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-[hsl(var(--chart-2))]"><Globe2 size={17} /></span><span className="flex-1"><span className="block text-xs font-bold">northstar.site</span><span className="mt-1 block text-[11px] text-muted-foreground">Primary · secured with SSL</span></span><span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]" /></div><button type="button" className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-[11px] font-bold text-muted-foreground transition hover:text-foreground" onClick={copyDomain} data-testid="button-copy-domain">{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy domain'}</button></div><button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-xs font-bold transition hover:border-foreground/30 hover:bg-muted" onClick={() => notify('Domain connection flow opened')} data-testid="button-add-domain"><Plus size={15} /> Connect another domain</button></>;
}

function AccountSetting({ notify }: { notify: (message: string) => void }) {
  return <><SettingHeader kicker="project controls / account" title="Account" detail="The details behind your workspace. Your personal profile is visible to teammates." /><div className="flex items-center gap-3 rounded-xl border border-border p-4"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--accent))] text-sm font-extrabold text-primary">AS</span><span className="flex-1"><span className="block text-sm font-bold">Avery Singh</span><span className="mt-1 block text-xs text-muted-foreground">avery@northstar.studio</span></span><button type="button" className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" onClick={() => notify('Profile editor opened')} data-testid="button-edit-profile" aria-label="Edit profile"><SlidersHorizontal size={16} /></button></div><div className="mt-5 space-y-2"><button type="button" className="flex w-full items-center gap-3 rounded-xl border border-border p-4 text-left transition hover:bg-muted" onClick={() => notify('Security settings opened')} data-testid="button-account-security"><LockKeyhole size={17} /><span className="flex-1"><span className="block text-xs font-bold">Security</span><span className="mt-1 block text-[11px] text-muted-foreground">Password and two-factor authentication</span></span><ArrowUpRight size={14} className="text-muted-foreground" /></button><button type="button" className="flex w-full items-center gap-3 rounded-xl border border-border p-4 text-left transition hover:bg-muted" onClick={() => notify('Billing settings opened')} data-testid="button-account-billing"><KeyRound size={17} /><span className="flex-1"><span className="block text-xs font-bold">Plan & billing</span><span className="mt-1 block text-[11px] text-muted-foreground">Studio plan · renews Nov 17</span></span><ArrowUpRight size={14} className="text-muted-foreground" /></button></div></>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
