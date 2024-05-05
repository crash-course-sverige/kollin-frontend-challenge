const getSummary = (exercises) => {
  return exercises.reduce(
    (summary, currentExercise) => {
      if (currentExercise.answeredCorrectly)
        summary.correctAnswers = summary.correctAnswers + 1;
      if (currentExercise.answeredCorrectly)
        summary.score = summary.score + currentExercise.difficultyScore;
      if (currentExercise.answeredCorrectly !== null)
        summary.attemptedExercises = summary.attemptedExercises + 1;
      return summary;
    },
    {
      correctAnswers: 0,
      score: 0,
      attemptedExercises: 0,
    }
  );
};

export default getSummary;
