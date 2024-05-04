"use client"
import { redirect } from "next/navigation";
import { useAssignmentsContext, useScoreContext } from "@/providers/providers";
import Nav from "@/components/Nav";
import Modal from "@/components/Modal";


export default function Layout({ children }) {
    const { assignments } = useAssignmentsContext();
    const { score } = useScoreContext();


    if (assignments.length === 0) {
        redirect('/practice');
    }

    if (score && score.hearts === 0) {
        return (
            <Modal text="game over" />
        );
    }

    return (
        <div
            className="bg-primary px-4 md:px-24 pt-2 md:pt-8 w-full min-h-dvh h-full flex flex-col items-center"
        >
            <h3
                className="text-text-light text-2xl md:text-4xl font-semibold"
            >
                Trigonometriska funktioner & identiteter
            </h3>

            <div
                className="bg-bg-light w-full h-full rounded-t-3xl md:rounded-t-[64px] px-6 md:px-28 lg:px-60 pt-4 md:pt-9"
            >
                <Nav />

                {children}
            </div>
        </div>
    );
}
