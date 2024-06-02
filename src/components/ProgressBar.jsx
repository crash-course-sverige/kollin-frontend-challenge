"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { Pill } from "./Pill";

const extractQuestionStatus = (assignment, userAnswerId) => {
  if (!userAnswerId) {
    return;
  }
  const correctAnswerId = assignment.answerOptions.find((x) => x.correct).id;
  if (Number(userAnswerId) === Number(correctAnswerId)) {
    return "correct";
  }
  return "incorrect";
};

export const ProgressBar = ({ assignments }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  return (
    <div className="flex gap-2 items-center">
      {assignments.map((assignment) => (
        <Link
          key={assignment.id}
          href={`/practice/${assignment.id}?${searchParams.toString()}`}
        >
          <Pill
            status={extractQuestionStatus(
              assignment,
              searchParams.get(assignment.id)
            )}
            isActive={id === assignment.id}
          />
        </Link>
      ))}
      <div className="flex items-center gap-2 text-red-600">
        <FaHeart />
        <span className="text-xl">{searchParams.get("hearts")}</span>
      </div>
    </div>
  );
};
