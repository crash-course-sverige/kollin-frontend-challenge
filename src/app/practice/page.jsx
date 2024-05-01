"use client";
import excersises from "../../../exercises.json";
import { Assignment } from "./Assignment";
import { Header } from "./Header";
import { useState } from "react";

export default function Practice() {
  const initialResults = excersises.reduce((acc, id) => {
    acc[id] = undefined;
    return acc;
  }, {});
  const [answersResult, setAnswersResult] = useState(initialResults);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const nextQuestion = () => {
    if(currentQuestion === excersises.length) {
        alert("Finita")
        return;
    }
    setCurrentQuestion(currentQuestion+1)
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      <div className="p-20 justify-between items-center relative min-w-[80%] flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
        <Header excersises={excersises} answersResult={answersResult} />

        {currentQuestion < excersises.length && <Assignment
          id={excersises[currentQuestion]}
          answersResult={answersResult}
          setResult={setAnswersResult}
          nextQuestion={nextQuestion}
        ></Assignment>}
      </div>
    </div>
  );
}
