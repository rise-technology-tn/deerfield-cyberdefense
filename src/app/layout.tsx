import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { TweaksProvider } from "../lib/tweaks";
import "../styles/index.css";

export const metadata: Metadata = {
  title: {
    default: "Deerfield Cyberdefense — Managed Security Services 24/7",
    template: "%s — Deerfield Cyberdefense",
  },
  description:
    "Managed Security Services 24/7. Intelligent security for intelligent business — L3/CSIRT incident detection & response, on-premise and in the cloud.",
  icons: { icon: "/assets/logo-mark-transparent.png" },
  referrer: "strict-origin-when-cross-origin",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

// No-flash theme bootstrap. Runs before paint so the saved theme/accent/layout
// is applied on first render. Static, trusted string — served inline with the
// request nonce so it satisfies the strict `script-src` CSP.
const THEME_INIT = `(function(){try{var s=JSON.parse(localStorage.getItem('df_tweaks')||'{}'),m={'#cf1c32':'red','#2a6fdb':'cobalt','#414854':'titanium'},d=document.documentElement;if(s.theme==='light'||s.theme==='obsidian')d.dataset.theme=s.theme;if(s.accent)d.dataset.accent=m[(''+s.accent).toLowerCase()]||'red';if(s.direction==='ops'||s.direction==='arch'||s.direction==='mono')d.dataset.direction=s.direction;}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" data-direction="ops" data-accent="red" data-theme="light">
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <TweaksProvider>{children}</TweaksProvider>
      </body>
    </html>
  );
}
