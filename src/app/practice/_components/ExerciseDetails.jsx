import { Inter } from "next/font/google";
import 'katex/dist/katex.min.css';
import Latex from "react-latex-next";
const inter = Inter({ subsets: ["latin"] });

const ExerciseDetails = ({
  selectedExercise,
  handleCheckAnswer,
  selectedAnswer,
  handleAnswerChange,
  showFeedback,
  infoMessage,
}) => {
  return (
    <section className='flex flex-col w-full max-w-[826px] '>
      <div className="text-2xl">
        <p>
          <Latex>{selectedExercise?.questionText}</Latex>
        </p>
      </div>
      <form className="mt-6 text-2xl" onSubmit={(e) => handleCheckAnswer(e)}>
        {selectedExercise?.answerOptions?.map((option, i) => (
          <label
            key={i}
            className={`w-full flex justify-center items-center h-14 mb-1.5 border-2 rounded-lg ${
              option.text === selectedAnswer.text ? "bg-septenary border-senary" : "border-octonary"
            }`}
          >
            <input
              className="mr-1"
              type="radio"
              name="answer"
              value={option.text}
              checked={selectedAnswer.text === option.text}
              onChange={() => handleAnswerChange(option)}
            />
            {<Latex>{option?.text}</Latex>}
          </label>
        ))}
        {showFeedback && <p className="mt-6 text-rose-600 text-center">{infoMessage}</p>}
        <button
          className={`w-full border rounded-lg h-12 text-white py-0.5 mt-6 text-base ${
            selectedExercise.answeredCorrectly !== null
              ? "bg-gray-400 border-senary text-black/80 cursor-not-allowed"
              : "bg-primary border-primary"
          } ${inter.className}`}
        >
          Check
        </button>
      </form>
    </section>
  );
};

export default ExerciseDetails;
