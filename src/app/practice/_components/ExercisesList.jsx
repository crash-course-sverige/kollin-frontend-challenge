import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";

const ExercisesList = ({
  exercises,
  handleExerciseSelected,
  selectedExercise,
  hearts,
}) => {
  return (
    <section className="w-full flex max-w-[826px] my-6">
      <div className="w-full flex items-center flex-row-reverse gap-1">
        {exercises.map((exercise, i) => (
          <div
            key={i}
            onClick={() => handleExerciseSelected(exercise)}
            className={`w-1/5 h-4 rounded-lg hover:cursor-pointer ${
              selectedExercise?.id === exercise.id
                ? "border-[3px] border-[#2F80ED]"
                : ""
            } ${
              exercise.answeredCorrectly === null
                ? "bg-quinary"
                : exercise.answeredCorrectly
                ? "bg-tertiary"
                : "bg-quaternary"
            }`}
          ></div>
        ))}
      </div>
      <div className="flex ml-1 items-center text-3xl">
        {hearts ? (
          <FaHeart className={`mx-2 text-rose-600`} />
        ) : (
          <FaHeartBroken className="text-rose-600" />
        )}
        <span className="text-rose-600">{hearts}</span>
      </div>
    </section>
  );
};

export default ExercisesList;
