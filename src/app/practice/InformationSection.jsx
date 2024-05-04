import Hints from './Hints';
import Badge from './Badge';
import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

const InformationSection = ({ currentAssignment }) => {
  return (
    <div className='h-full grid grid-cols-[2rem_auto_2rem] gap-4'>
      <div className='w-8 h-8'>
        {currentAssignment.hints && (
          <Hints hints={currentAssignment.hints}></Hints>
        )}
      </div>

      {currentAssignment.userAnswerChecked && (
        <>
          {currentAssignment.answeredCorrectly ? (
            <Badge styling='bg-green-200 border-green-300'>
              <FaCheck className='text-green-500' />
              <p>Ditt svar är korrekt!</p>
            </Badge>
          ) : (
            <Badge styling='bg-red-200 border-red-300'>
              <IoCloseSharp className='text-red-500 text-2xl' />
              <p>Ditt svar är inkorrekt.</p>
            </Badge>
          )}
        </>
      )}
    </div>
  );
};

export default InformationSection;
