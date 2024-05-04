import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const Hints = ({ hints }) => {
  const [hintIndex, setHintIndex] = useState(0);

  const handleNextHint = () => {
    setHintIndex((old) => {
      if (old < hints.length - 1) {
        return old + 1;
      } else {
        return 0;
      }
    });
  };

  const handlePreviousHint = () => {
    setHintIndex((old) => {
      if (old > 0) {
        return old - 1;
      } else {
        return hints.length - 1;
      }
    });
  };
  return (
    <div className='flex justify-center items-center h-12 w-12 group relative'>
      <div className='hidden group-hover:flex justify-center items-center  w-96 h-fit p-6 pb-14 list-disc absolute bottom-0 left-0 rounded-lg border bg-slate-100 shadow'>
        <p className='text-sm'>{hints[hintIndex]}</p>
        <div className='flex items-center absolute bottom-0 right-1 h-12 text-slate-500 text-sm'>
          <button onClick={handlePreviousHint}>
            <MdOutlineArrowBackIos className='hover:text-slate-500/70' />
          </button>
          {hintIndex + 1} / {hints.length}
          <button onClick={handleNextHint}>
            <MdOutlineArrowForwardIos className='hover:text-slate-500/70' />
          </button>
        </div>
      </div>
      <HiOutlineLightBulb className='text-3xl text-slate-500 group-hover:text-slate-500/80 z-20' />
    </div>
  );
};

export default Hints;
