const AnswerButton = ({ text, selected, disabled, handleSelectAnswer }) => {
  let border = 'border-gray-200';
  let bgColor = '';

  if (selected) {
    border = 'border border-blue-400';
    bgColor = 'bg-[#E2E8F9]';
  }

  return (
    <button
      className={`flex pl-[30%] min-[1000px]:pl-[40%] rounded-lg enabled:hover:bg-[#E2E8F9] border ${border} ${bgColor}`}
      onClick={handleSelectAnswer}
      disabled={disabled}
    >
      <div className='flex justify-start items-center gap-2 p-3'>
        <input
          type='radio'
          checked={selected}
          onChange={handleSelectAnswer}
          disabled={disabled}
        ></input>
        {text}
      </div>
    </button>
  );
};

export default AnswerButton;
