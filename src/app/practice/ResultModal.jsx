import { FaSadCry } from 'react-icons/fa';
import Button from './Button';
import Modal from './Modal';

const ResultModal = ({ assignments, handleReset, gameOver = false }) => {
  const scoreMultiplier = 10;
  let maxScore = 0;
  let score = 0;
  let answerCount = 0;

  for (const assignment of assignments) {
    maxScore += assignment.difficultyScore * scoreMultiplier;

    if (assignment.answeredCorrectly) {
      score += assignment.difficultyScore * scoreMultiplier;
    }

    if (assignment.userAnswerChecked) {
      answerCount += 1;
    }
  }

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <Modal>
      <div className='flex flex-col gap-8 justify-center items-center'>
        {gameOver && (
          <div className='flex flex-col gap-8 justify-center items-center'>
            <FaSadCry className='text-8xl text-[#586FB5]/70' />
            <p className='text-3xl font-bold'>
              Åh nej, du har förlorat alla dina hjärtan!
            </p>
            <p className='text-3xl'>
              Du besvarade {answerCount} av {assignments.length} frågor
            </p>
          </div>
        )}
        <p className='text-3xl'>
          {percentage >= 80 && !gameOver && 'Grattis! '}Du fick {score} poäng av{' '}
          {maxScore} möjliga
        </p>
        <p className='text-9xl font-bold'>{percentage}%</p>
      </div>
      <Button
        text={gameOver ? 'Försök igen' : 'Börja om'}
        onClick={handleReset}
      />
    </Modal>
  );
};

export default ResultModal;
