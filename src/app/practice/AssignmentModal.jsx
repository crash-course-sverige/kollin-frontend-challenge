import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import Modal from './Modal';

const AssignmentModal = ({
  currentAssignment,
  checkForAnswers,
  nextButton,
}) => {
  return (
    <Modal>
      <div className='flex justify-center items-center gap-1'>
        {currentAssignment.answeredCorrectly ? (
          <>
            <FaCheck className='text-green-500' />
            <h1 className='text-xl'>Ditt svar är korrekt!</h1>
          </>
        ) : (
          <>
            <IoCloseSharp className='text-red-500 text-2xl' />
            <h1 className='text-xl'>Ditt svar är inkorrekt.</h1>
          </>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='font-bold'>Lösning:</h2>
        <p>{currentAssignment.solutionText}</p>
      </div>
      {checkForAnswers() && (
        <h2 className='text-xl text-center'>Du har besvarat alla frågor!</h2>
      )}
      {nextButton}
    </Modal>
  );
};

export default AssignmentModal;
