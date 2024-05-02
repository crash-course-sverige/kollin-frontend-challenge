"use client";
import { nanoid } from "nanoid";
import { RadioGroup, Button, Radio, Chip, Card, CardBody } from "@nextui-org/react";
import { KatexSpan } from "../katex/KatexSpan";
import { useAssignmentLogic } from "../hooks/useAssignmentLogic";

export function Assignment({ id, answersResult, setResult, takeLife }) {
  const {
    loading,
    error,
    noData,
    questionText,
    difficultyScore,
    options,
    setSelectedOption,
    isCorrect,
    checkHandler,
  } = useAssignmentLogic(id, answersResult, setResult, takeLife);

  if (loading) {
    return <div>loading.....</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (noData) {
    return <div>No data for this question</div>;
  }

  const resultText = isCorrect ? (
    <Chip color="success">Correct answer!</Chip>
  ) : (
    <Chip color="danger">Incorrect answer!</Chip>
  );

  return (
    <div>
      {isCorrect !== undefined && (
        <Card className="mb-20">
          <CardBody>
            <p>Select next question</p>
          </CardBody>
        </Card>
      )}

      <h1>Difficulty Score: {difficultyScore}</h1>
      <div className="relative min-w-[80%] mb-10 flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <div className="p-12">
          <KatexSpan text={questionText} className="mx-20 my-20 text-xl" />
        </div>
      </div>
      {isCorrect !== undefined ? resultText : ""}
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
