import type { Metadata, Viewport } from 'next';
import { ColorSchemeScript, Container, DEFAULT_THEME, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { siteConfig } from '~/config/site';
import { greycliffCF } from '~/lib/fonts';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import 'mantine-react-table/styles.css';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: ['/favicon.svg'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.title,
    title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.title}`,
    },
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.title}`,
    },
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#C9C9C9',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider
          theme={{
            fontFamily: greycliffCF.style.fontFamily,
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: {
              fontFamily: `${greycliffCF.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
            },
          }}
          defaultColorScheme='dark'
        >
          <Notifications />
          <Container py='lg'>{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}
