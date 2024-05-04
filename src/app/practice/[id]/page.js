"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAssignmentsContext, useScoreContext } from '@/providers/providers';
import { MathJax } from 'better-react-mathjax';

export default function Page() {
    const params = useParams();
    const { assignments } = useAssignmentsContext();
    const { score, setScore } = useScoreContext();
    const [data, setData] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [isSolutionTextVisible, setIsSolutionTextVisible] = useState(false);


    useEffect(() => {
        const loadData = (id) => {
            const newData = assignments.find(i => i.id === id);
            setData(newData);
        }

        loadData(params.id);
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const updateScore = (id, answer) => {
            const newStatus = answer ? 'passed' : 'failed';
            const newTasks = score.tasks.map(i => i.id === id ? { ...i, status: newStatus } : i);
            if (!answer) {
                setScore({ hearts: score.hearts - 1, tasks: newTasks })
            } else {
                setScore({ ...score, tasks: newTasks });
            }
        }

        updateScore(data.id, answer);
        setIsSolutionTextVisible(true);
    }

    if (data) {
        return (
            <div
                className="flex flex-col gap-4 w-full py-4"
            >
                <MathJax>
                    <p>
                        {data.questionText}
                    </p>
                </MathJax>

                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleOnSubmit}
                >

                    {
                        data.answerOptions.map(i => {
                            return (
                                <label
                                    htmlFor={i.id}
                                    key={i.id}
                                    className="hover:cursor-pointer flex justify-center items-center gap-2 w-full h-12 rounded-lg border border-neutral has-[:checked]:border-primary-200 has-[:checked]:bg-primary-50"
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={i.correct}
                                        id={i.id}
                                        disabled={isSolutionTextVisible}
                                        onChange={() => setAnswer(i.correct)}
                                    />
                                    <MathJax>
                                        <p>
                                            {i.text}
                                        </p>
                                    </MathJax>
                                </label>
                            )
                        })
                    }

                    <button
                        className="w-full bg-primary text-text-light h-12 rounded-lg disabled:bg-neutral"
                        disabled={answer === null || isSolutionTextVisible ? true : false}
                    >
                        Check
                    </button>
                </form>

                {
                    isSolutionTextVisible &&
                    <MathJax>
                        <p>
                            {data.solutionText}
                        </p>
                    </MathJax>
                }

            </div>
        )
    }

}
