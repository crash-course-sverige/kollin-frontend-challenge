export const Pill = ({ status, isActive, extractQuestionStatus }) => {
  let border = "";
  if (isActive) {
    border = "border-2 border-solid border-blue-500";
  }
  let bgColor = "bg-gray-300";
  if (status === "correct") {
    bgColor = "bg-green-300";
  }
  if (status === "incorrect") {
    bgColor = "bg-red-300";
  }

  return <div className={`h-3 w-20 rounded-full flex ${border} ${bgColor}`} />;
};
