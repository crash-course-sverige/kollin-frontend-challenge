import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useGameManagement = (assignment) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userAnswerId = searchParams.get(assignment.id);
  const onSubmit = async (formData) => {
    const answerId = formData.get("answer");
    const assignmentId = assignment.id;
    const params = new URLSearchParams(searchParams.toString());

    let hearts = searchParams.get("hearts");

    const correctAnswer = assignment.answerOptions.find((x) => x.correct);
    if (answerId !== correctAnswer.id) {
      hearts = hearts - 1;
    }

    params.set("hearts", hearts);
    params.set(assignmentId, answerId);
    router.push(`/practice/${assignment.id}?${params.toString()}`);
  };

  return {
    onSubmit,
    searchParams,
    userAnswerId,
  };
};
