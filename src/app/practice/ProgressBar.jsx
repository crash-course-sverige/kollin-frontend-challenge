import { FaHeart } from 'react-icons/fa';

const ProgressBar = ({
  assignments,
  currentAssignmentIndex,
  setCurrentAssignmentIndex,
  hearts,
}) => {
  const generateProgressBar = () => {
    return assignments.map((assignment, index) => {
      let border = '';
      let color = 'bg-gray-300';

      if (index === currentAssignmentIndex) {
        border = 'outline outline-2 outline-offset-2 outline-blue-400';
      }

      if (assignment.answeredCorrectly === true) {
        color = 'bg-[#66C61C]';
      } else if (assignment.answeredCorrectly === false) {
        color = 'bg-[#F79009]';
      }
      return (
        <button
          onClick={() => {
            setCurrentAssignmentIndex(index);
          }}
          key={`${assignment.id}-section-button`}
          className={`h-full grow rounded-full ${color} ${border}`}
        ></button>
      );
    });
  };

  return (
    <div className='flex h-full gap-2 items-center'>
      <div className='flex h-2 w-full gap-2'>{generateProgressBar()}</div>
      <div className='flex gap-1 h-4 items-center text-rose-500 text-lg'>
        <FaHeart />
        {hearts}
      </div>
    </div>
  );
};

export default ProgressBar;
