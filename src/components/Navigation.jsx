"use client";

export default function Navigation({
  exercises,
  currentExercise,
  handleExerciseChange,
}) {
  const handleClick = (clickedExercise) => {
    const indexOfClickedExercise = exercises.findIndex(
      (exercise) => exercise.id === clickedExercise.id
    );
    handleExerciseChange(indexOfClickedExercise);
  };

  return (
    <div className="w-full">
      <ul className="flex gap-2">
        {exercises.map((exercise) => (
          <li
            onClick={() => handleClick(exercise)}
            className={`
            ${
              exercise.id === currentExercise.id
                ? "border-2 border-blue-500"
                : ""
            }  
            ${
              exercise.selectedAnswer === undefined
                ? "bg-gray-300"
                : exercise.selectedAnswer ===
                  exercise.answerOptions.find(
                    (option) => option.correct === true
                  ).text
                ? "bg-[#66C61C]"
                : "bg-[#F79009]"
            } 
            
            h-4 flex-grow rounded-full cursor-pointer`}
            key={exercise.id}
          ></li>
        ))}
      </ul>
    </div>
  );
}
