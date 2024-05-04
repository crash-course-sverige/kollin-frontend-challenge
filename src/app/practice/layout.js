"use client"
import Providers from '@/providers/providers';
import { MathJaxContext } from 'better-react-mathjax';

export default function Layout({ children }) {
    return (
        <Providers>
            <MathJaxContext>
                {children}
            </MathJaxContext>
        </Providers>
    );
}
