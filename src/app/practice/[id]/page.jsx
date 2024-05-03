import Latex from "react-latex-next";
import { FaHeart } from "react-icons/fa";
import "katex/dist/katex.min.css";
import { getExercise } from "@/app/services/assignmentAPI";

export default async function Page({ params }) {
  const assignment = await getExercise(params.id);

  return (
    <div className="bg-[#586FB5] min-h-screen flex pt-24 pl-8 pr-8 justify-center">
      <div className="bg-white text-black w-[888px] rounded-t-[5rem] p-8 flex flex-col gap-8">
        <div className="flex gap-2 items-center justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-2 w-20 rounded-full bg-gray-300 flex"
            />
          ))}
          <div className="flex items-center gap-2 text-red-600">
            <FaHeart />
            <span className="text-xl">3</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl">
            <Latex>{assignment.questionText}</Latex>
          </h2>
        </div>
        <div>
          <ul className="flex flex-col gap-3">
            {assignment.answerOptions.map((option, index) => (
              <li
                key={option.id}
                className="flex items-center border rounded-md p-2"
              >
                <label className="flex items-center w-full cursor-pointer">
                  <input
                    className="h-5 w-5 mr-2 cursor-pointer"
                    type="radio"
                    name="Answer"
                  />
                  <Latex>{option.text}</Latex>
                </label>
              </li>
            ))}
            <button className="bg-[#586FB5] text-white p-2 rounded-md hover:bg-blue-600 mt-8">
              Check
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
