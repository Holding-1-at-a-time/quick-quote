import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/react';
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <Analytics />
      <
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}

