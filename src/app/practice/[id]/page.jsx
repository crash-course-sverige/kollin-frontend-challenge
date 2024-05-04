import Latex from "react-latex-next";
import { getAssignment, getAssignments } from "@/services/assignmentApi";
import { Assignment } from "../../../components/Assignment";

import "katex/dist/katex.min.css";
import { Progressbar } from "@/components/Progressbar";

export default async function Page({ params }) {
  const assignment = await getAssignment(params.id);
  const assignments = await getAssignments();
  const index = assignments.findIndex((x) => x.id === assignment.id);
  const nextAssignment = assignments[index + 1];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#586FB5]">
      <h1 className="pt-24 pl-8 pr-8 text-center text-white text-4xl">
        Trigonometriska funktioner & identiteter
      </h1>
      <div className="bg-white text-black w-[888px] pl-[191px] pr-[191px] rounded-t-[5rem] p-8 mt-8 flex flex-col gap-8">
        <Progressbar assignments={assignments} />
        <Assignment assignment={assignment} nextAssignment={nextAssignment} />
      </div>
    </div>
  );
}
