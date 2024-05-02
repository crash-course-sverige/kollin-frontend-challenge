'use client';

import { useState } from 'react';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const Gameboard = ({ assignments }) => {
  const [currentAssignment, setCurrentAssignment] = useState(0);
  const [hearts, setHearts] = useState(3);

  const generateProgressBar = () => {
    return assignments.map((assignment, index) => {
      let border = '';
      let color = 'bg-gray-300';

      if (index === currentAssignment) {
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
            setCurrentAssignment(index);
          }}
          key={`${assignment.id}-section-button`}
          className={`h-full grow rounded-full ${color} ${border}`}
        ></button>
      );
    });
  };

  return (
    <div className='flex flex-col h-5/6 w-5/6 max-w-[1024px] px-32 py-12 bg-white rounded-t-3xl gap-8'>
      <div className='flex gap-2 items-center'>
        <div className='flex h-2 w-full gap-2'>{generateProgressBar()}</div>
        <div className='flex gap-1 h-4 items-center text-rose-500'>
          {hearts === 0 ? <FaHeartBroken /> : <FaHeart />}
          {hearts}
        </div>
      </div>
      <p>{assignments[currentAssignment].questionText}</p>
      <div className='flex flex-col gap-2'>
        {assignments[currentAssignment].answerOptions.map((answer, index) => {
          return (
            <div
              className='grid grid-cols-3 border border-gray-200 rounded-lg hover:bg-[#E2E8F9]'
              key={`answer-button-${index}`}
            >
              <div
                className='col-start-2 flex justify-start items-center gap-2 p-3
              2'
              >
                <input type='radio'></input>
                {answer.text}
              </div>
            </div>
          );
        })}
      </div>
      <button className='p-3 bg-[#586FB5] text-light rounded-lg hover:bg-[#586FB5]/90'>
        Check
      </button>
    </div>
  );
};

export default Gameboard;
