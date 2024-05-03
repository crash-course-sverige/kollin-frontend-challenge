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

  // return (
  //   <div>
  //     <ul className="flex">
  //       {exercises.map((exercise) => (
  //         <li
  //           onClick={() => handleClick(exercise)}
  //           className={`${
  //             exercise.id === currentExercise.id ? "border border-blue-500" : ""
  //           } m-4 w-12 h-4  ${
  //             exercise.selectedAnswer ===
  //             exercise.answerOptions.find((option) => option.correct === true)
  //               ? "bg-green-500"
  //               : "bg-red-300"
  //           }`}
  //           key={exercise.id}
  //         ></li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <ul className="flex">
        {exercises.map((exercise) => (
          <li
            onClick={() => handleClick(exercise)}
            className={`${
              exercise.id === currentExercise.id ? "border border-blue-500" : ""
            }  m-4 w-12 h-4 bg-red-300`}
            key={exercise.id}
          ></li>
        ))}
      </ul>
    </div>
  );
}
