import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/dates/styles.css";
import '@mantine/notifications/styles.css';
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["500"],
  subsets: ["latin"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Secret Gifter",
  description: "A Secret Santa app for your friends and family 🎅",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mantine-color-scheme="dark" suppressHydrationWarning>
      <head>
        <ColorSchemeScript
          style={{ fontFamily: inter.style.fontFamily }}
          defaultColorScheme="dark"
        />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            fontFamily: inter.style.fontFamily,
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
