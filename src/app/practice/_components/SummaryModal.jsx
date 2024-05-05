const SummaryModal = ({ handleReset, summary, textContent, textColour }) => {
  return (
    <section className="absolute flex w-screen h-screen bg-black/60">
      <button
        className="absolute top-0 right-0 py-2 px-4 m-3 rounded-[100%] bg-slate-50/35 text-white"
        onClick={handleReset}
      >
        X
      </button>
      <div className="m-auto flex flex-col items-center p-20 text-gray-400 bg-black rounded-3xl">
        <h2 className={`m-auto mb-3 text-5xl ${textColour}`}>{textContent}</h2>
        <p className="mb-1 text-3xl">
          Correct answers: {summary.correctAnswers}
        </p>
        <p className="mb-1 text-3xl">Total score: {summary.score.toFixed(2)}</p>
        <p className="mb-1 text-3xl">
          Attempted exercises: {summary.attemptedExercises}
        </p>
      </div>
    </section>
  );
};

export default SummaryModal;
