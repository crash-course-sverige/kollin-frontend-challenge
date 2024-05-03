import React from "react";
import Latex from "react-latex";
import { useState, useEffect } from "react";
import Radios from "./Radios";

const Card = ({ assignment }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="card px-[232px] py-8 mx-64 rounded-2xl bg-white h-full">
      <div key={assignment.id} className="flex flex-col gap-8">
        <div>progress</div>
        <Latex>{assignment.questionText}</Latex>
        <Radios
          assignment={assignment}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default Card;
