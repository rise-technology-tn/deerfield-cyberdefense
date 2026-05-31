/*
 * Icon — thin wrapper over lucide-react.
 *
 * Using the lucide-react package (bundled, self-hosted) instead of the lucide
 * CDN <script> removes a third-party origin from the page entirely, which keeps
 * the production CSP at `script-src 'self'` with no exceptions.
 *
 * Keeps the original design API: <Icon name="shield-check" size={18} />.
 */
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDot,
  Clock,
  DraftingCompass,
  Globe,
  Loader,
  Lock,
  Mail,
  Menu,
  PhoneCall,
  Radar,
  Ruler,
  Scale,
  ScanSearch,
  ScrollText,
  ShieldCheck,
  Siren,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  activity: Activity,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  check: Check,
  "chevron-right": ChevronRight,
  "circle-dot": CircleDot,
  clock: Clock,
  "drafting-compass": DraftingCompass,
  globe: Globe,
  loader: Loader,
  lock: Lock,
  mail: Mail,
  menu: Menu,
  "phone-call": PhoneCall,
  radar: Radar,
  ruler: Ruler,
  scale: Scale,
  "scan-search": ScanSearch,
  "scroll-text": ScrollText,
  "shield-check": ShieldCheck,
  siren: Siren,
  users: Users,
  x: X,
};

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

export function Icon({
  name,
  size = 18,
  color,
  strokeWidth = 1.9,
  className,
  style,
}: IconProps) {
  const Glyph = ICONS[name];
  return (
    <span
      className={"icon " + (className || "")}
      style={{ display: "inline-flex", color, ...(style || {}) }}
      aria-hidden="true"
    >
      {Glyph ? <Glyph size={size} strokeWidth={strokeWidth} /> : null}
    </span>
  );
}
