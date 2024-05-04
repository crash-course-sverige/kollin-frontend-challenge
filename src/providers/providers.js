"use client"
import { createContext, useContext, useState } from "react";

const AssignmentsContext = createContext(null);
const ScoreContext = createContext(null);

export default function Providers({ children }) {
    const [assignments, setAssignments] = useState([]);
    const [score, setScore] = useState({});

    return (
        <AssignmentsContext.Provider value={{ assignments, setAssignments }}>
            <ScoreContext.Provider value={{ score, setScore }}>
                {children}
            </ScoreContext.Provider>
        </AssignmentsContext.Provider>
    );
}

export function useAssignmentsContext() {
    return useContext(AssignmentsContext);
};

export function useScoreContext() {
    return useContext(ScoreContext);
};
