import { useState } from "react";
import { useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import GetAssignmentQuery from "../../graphql/GetAssignment.query";

export function useAssignmentLogic(id, answersResult, setResult, takeLife) {
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
    return { loading: true };
  }
  if (error) {
    return { error: error.message };
  }

  if (!data.getAssignment) {
    return { noData: true };
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
  const difficultyScore = data.getAssignment.difficultyScore;

  return {
    loading: false,
    questionText,
    difficultyScore,
    options,
    selectedOption,
    setSelectedOption,
    isCorrect,
    checkHandler,
  };
}
