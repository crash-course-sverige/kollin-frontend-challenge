import React from "react";
import Latex from "react-latex";
import { useState, useEffect } from "react";
import Radios from "./Radios";
import Progress from "./Progress";
import Lives from "./Lives";

const Card = ({
  assignment,
  assignments,
  index,
  answers,
  setIndex,
  setAnswers,
  lives,
  setLives,
}) => {
  const [selected, setSelected] = useState(null);

  const correctGuesses = answers.filter((answer) => answer.isCorrect).length;

  return (
    <div className="card lg:px-[232px] lg:mx-64 lg:w-[1200px] md:w-full px-8 lg:py-8 py-2 rounded-[60px] bg-white h-full text-black lg:text-base text-sm">
      <div key={assignment.id} className="flex flex-col gap-8">
        <div className="w-full flex flex-row gap-4">
          <Progress
            assignments={assignments}
            index={index}
            answers={answers}
            setIndex={setIndex}
          />
          <Lives lives={lives} />
        </div>
        <Latex>{assignment.questionText}</Latex>
        <Radios
          assignment={assignment}
          selected={selected}
          setSelected={setSelected}
          answers={answers}
          setAnswers={setAnswers}
          setLives={setLives}
          index={index}
          setIndex={setIndex}
        />
      </div>
      {lives <= 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal bg-white rounded-lg p-8  w-1/3 flex flex-col items-center">
            <h1 className="text-xl font-extrabold self-center flex gap-4 items-center mb-4">
              No lives left! <Lives lives={lives} />
            </h1>
            <p className="text-center">Ooops! It seems you ran out of lives!</p>
            <p className="text-center">
              Wait for a while to recharge them and play again.
            </p>

            <div className="mt-8">
              {" "}
              <p className="text-center mt-4">
                Correct Guesses:{" "}
                <span className="text-green-600 font-bold">
                  {correctGuesses}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
