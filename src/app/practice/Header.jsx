"use client";
import { nanoid } from "nanoid";
import Heart from "./Heart";

export function Header({
  excersises,
  answersResult,
  lifes,
  changeQuestion,
  currentQuestionId,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-20 justify-center md:justify-start">
      {excersises.map((id) => {
        let bgClass;
        if (answersResult[id] === undefined) {
          bgClass = "bg-custom-gray";
        } else if (answersResult[id]) {
          bgClass = "bg-custom-green";
        } else {
          bgClass = "bg-custom-red";
        }

        const isActive = currentQuestionId === id;
        const borderClass = isActive ? "border-2 border-[#202746]" : "";

        return (
          <div
            key={nanoid()}
            className={`relative grid select-none items-center rounded-lg  px-12 py-2 cursor-pointer ${bgClass}  ${borderClass} hover:bg-blue-300 md:w-auto md:px-6 lg:px-12`}
            onClick={() => changeQuestion(id)}
          ></div>
        );
      })}
      <Heart /> {lifes}
    </div>
  );
}
