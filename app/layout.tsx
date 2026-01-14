import type { Metadata } from "next";
import { Lateef } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import Script from "next/script";

const lateef = Lateef({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lateef',
});

export const metadata: Metadata = {
  title: "بەزاری پیشەسازی - پلاتفۆرمی هایپەر لۆکاڵ",
  description: "پلاتفۆرمی خزمەتگوزاری بۆ پەیوەندیکردنی کاستەمەر و پرۆڤایدەر",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ku" dir="rtl" className={lateef.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={lateef.className}>
        <LanguageProvider>
          <ToastProvider>
            <ConnectionStatus />
            {children}
          </ToastProvider>
        </LanguageProvider>

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful');
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
