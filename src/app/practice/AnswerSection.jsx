import Button from './Button';
import AnswerButton from './AnswerButton';

const AnswerSection = ({
  currentAssignment,
  handleSelectAnswer,
  handleCheckAnswer,
}) => {
  return (
    <ul className='h-full flex flex-col gap-2'>
      {currentAssignment.answerOptions.map((answer, index) => {
        let selected = false;

        if (currentAssignment.userAnswer === index) {
          selected = true;
        }

        return (
          <AnswerButton
            text={answer.text}
            selected={selected}
            key={`answer-button-${index}`}
            disabled={currentAssignment.userAnswerChecked}
            handleSelectAnswer={() => {
              handleSelectAnswer(index);
            }}
          />
        );
      })}
      <Button
        onClick={handleCheckAnswer}
        disabled={
          currentAssignment.userAnswer === null ||
          currentAssignment.userAnswerChecked
        }
        text={currentAssignment.userAnswerChecked ? 'Besvarad' : 'Check'}
        styling='mt-8'
      />
    </ul>
  );
};

export default AnswerSection;
