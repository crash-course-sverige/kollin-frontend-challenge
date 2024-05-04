import Button from './Button';
import Modal from './Modal';
import { FaSadCry } from 'react-icons/fa';

const GameOverModal = ({ handleReset }) => {
  return (
    <Modal>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <FaSadCry className='text-8xl text-[#586FB5]/70' />
        <p className='text-3xl'>Åh nej, du har förlorat alla dina hjärtan!</p>
      </div>
      <Button text='Försök igen' onClick={handleReset} />
    </Modal>
  );
};

export default GameOverModal;
