import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ApolloWrapper } from "./lib/apollo-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kollin frontend challenge",
  description: "Kollin frontend challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <Providers>{children}</Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
