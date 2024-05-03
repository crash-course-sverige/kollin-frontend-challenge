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
    <div>
      <ul className="flex ">
        {exercises.map((exercise) => (
          <li
            onClick={() => handleClick(exercise)}
            className={`
            ${
              exercise.id === currentExercise.id ? "border border-blue-500" : ""
            }  
            ${
              exercise.selectedAnswer === undefined
                ? "bg-gray-300"
                : exercise.selectedAnswer ===
                  exercise.answerOptions.find(
                    (option) => option.correct === true
                  ).text
                ? "bg-green-300"
                : "bg-red-300"
            } 
            
             m-2 h-4 w-[146px] rounded-full cursor-pointer`}
            key={exercise.id}
          ></li>
        ))}
      </ul>
    </div>
  );
}
