import { Crimson_Text } from "next/font/google";
import "./globals.css";

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "Kollin frontend challenge",
  description: "Kollin frontend challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={crimson.className}>{children}</body>
    </html>
  );
}
