import { Inter } from "next/font/google";
import "./globals.css";
import { ExerciseProvider } from "./practice/globalStates";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kollin frontend challenge",
  description: "Kollin frontend challenge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ExerciseProvider>
        {children}
        </ExerciseProvider>
      </body>
    </html>
  );
}
