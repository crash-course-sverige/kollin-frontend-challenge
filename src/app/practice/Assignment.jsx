"use client";
import { useState } from "react";
import GetAssignmentQuery from "../../graphql/GetAssignment.query";
import { useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { KatexSpan } from "../katex/KatexSpan";

export function Assignment({ id, answersResult, setResult, takeLife }) {
  const [selectedOption, setSelectedOption] = useState();
  const [isCorrect, setIsCorrect] = useState();

  const { data, loading, error } = useQuery(GetAssignmentQuery, {
    context: {
      headers: {
        Authorization: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhTVVAwa3ZaUHl3S296bkU1SkNGMW1KbnJnT29CdTRjVHBTMDViQWc4RXMifQ.eyJzdWIiOiIyNjQyMSIsImlkIjoyNjQyMSwiZiI6IjlhOTJmNjMxYzNmNjNkZDgzOGNiNzZjZTcwNDZiNmM5IiwibWF4QWxsb3dlZERldmljZXMiOjEsImdyb3VwcyI6WyJQVUJMSUMiXSwiYXVkIjoiaW50ZXJuYWwiLCJleHAiOjE3MTcxMDE0MDgsImlhdCI6MTcxNDUwOTQwOCwiaXNzIjoiaHR0cHM6Ly9hcGkudG50b3Iuc2Uvb2lkYyJ9.QmNBGduFAihbzKd2ETRQ1DukxHta8_G-CRK8RHtLhAqFDcD9pcK6mbdZCRYx-TKG2Ovyi1LS7MpcG-mYNsq8kNrMOHWVgJtDNyJEjgdYQMFZwsfGikKu5KRNHHf1j8g8tYqEcT7Yw_Azv9uMeiGU1CcL1jGRBhbaqVo3G1pXCxVupHbHsKQn237DC7n2fbaiVVM2S2J1bOFSATbfj35yDJmgZzLOQWqGebl4UkfFZcgWImWcj1IwVRogrCWRK5HZbeElgIu02mlcD8XrFpOV1oFgEnMiMmHjdbgPvm_RX4-FkJTJXUXflVRQYhBFVtOH9bf-t1FTY8FM7kV19uRhHw`,
      },
    },
    variables: {
      id,
    },
  });

  if (loading) {
    return <div>loading.....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data.getAssignment) {
    return <div>No data for this question</div>;
  }
  const answerOptions = data.getAssignment.answerOptions;
  const options = answerOptions.map((o) => ({ text: o.text, id: nanoid() }));

  const checkHandler = () => {
    const correctAnswer = answerOptions.filter((o) => o.correct).pop().text;
    const newResult = { ...answersResult };
    newResult[id] = correctAnswer === selectedOption;
    setIsCorrect(newResult[id]);
    if (!isCorrect) {
      takeLife();
    }
    setResult(newResult);
  };

  const questionText = data.getAssignment.questionText;

  return (
    <div>
      <div className="relative min-w-[80%] mb-10 flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <div className="p-12">
          <KatexSpan text={questionText} className="mx-20 my-20 text-xl" />
        </div>
      </div>
      {isCorrect !== undefined
        ? isCorrect
          ? "Correct answer!"
          : "Incorrect answer!"
        : ""}
      <RadioGroup>
        <nav className="min-w-[80%] flex flex-col gap-2 p-2 font-sans text-base font-normal text-blue-gray-700">
          {options.map((option) => (
            <div
              key={nanoid()}
              role="button"
              className="min-w-[40%] flex items-center w-full p-3 leading-tight transition-all 
            rounded-lg outline-none text-start hover:bg-blue-gray-50 
            hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 
            focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
            active:bg-opacity-80 active:text-blue-gray-900  border-2 border-[#E7E5E4]"
            >
              <Radio
                key={nanoid()}
                value={option.text}
                className="min-w-[100%] "
                onChange={() => setSelectedOption(option.text)}
              >
                <KatexSpan text={option.text} />
              </Radio>
            </div>
          ))}
        </nav>
      </RadioGroup>
      <Button onClick={checkHandler} className="check-btn mt-10">
        Check
      </Button>
    </div>
  );
}
