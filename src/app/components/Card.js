import React from "react";
import Latex from "react-latex";
import { useState, useEffect } from "react";
import Radios from "./Radios";
import { Button } from "@nextui-org/react";
import Progress from "./Progress";
import Lives from "./Lives";

const Card = ({ assignment, assignments, index, answers, setAnswers }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="card px-[232px] py-8 mx-64 rounded-2xl bg-white h-full">
      <div key={assignment.id} className="flex flex-col gap-8">
        <div className="w-full flex flex-row gap-4">
          <Progress assignments={assignments} index={index} />
          <Lives lives={3} />
        </div>
        <Latex>{assignment.questionText}</Latex>
        <Radios
          assignment={assignment}
          selected={selected}
          setSelected={setSelected}
          answers={answers}
          setAnswers={setAnswers}
        />
      </div>
    </div>
  );
};

export default Card;
