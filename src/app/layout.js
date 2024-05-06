import { Inter } from 'next/font/google';
import './globals.css';
import { AssignmentProvider } from '../app/context/AssignmentProvider';
import { NextUIProvider } from '@nextui-org/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kollin frontend challenge',
  description: 'Kollin frontend challenge',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AssignmentProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </AssignmentProvider>
      </body>
    </html>
  );
}
