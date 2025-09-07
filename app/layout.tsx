import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkWrapper } from "@/components/clerk-wrapper"; // Import the new wrapper

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'ONS Energy - Records Management',
//   description: 'Professional energy broker records management system',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkWrapper>
  );
}