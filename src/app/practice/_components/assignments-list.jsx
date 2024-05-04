import React from 'react'
import { Heart } from 'lucide-react';
import exercises from '../../../../exercises.json'
import { AssignmentListItem } from './assignment-list-item';

export const AssignmentsList = ({
  hearts,
  currentExerciseNo,
  setCurrentExerciseNo,
  validQuestions,
  setValidQuestions,
  currentExerciseId,
  setCurrentExerciseId,
}) => {



  return (
    <div className='w-full h-[100px] flex items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-full h-full md:px-16 px-8'>
        <div className='w-[calc(100%-60px)] py-6 h-full'>
          <div className='flex gap-2 items-center w-full h-full'>
            {exercises.map(exercise => (
              <AssignmentListItem 
                key={exercise}
                currentExerciseNo={currentExerciseNo}
                setCurrentExerciseNo={setCurrentExerciseNo}
                exerciseId={exercise}
                validQuestions={validQuestions}
                setValidQuestions={setValidQuestions}
                currentExerciseId={currentExerciseId}
                setCurrentExerciseId={setCurrentExerciseId}
              />
            ))}
          </div>
        </div>
        {validQuestions.length > 0 && (
          <div className='flex gap-1.5 flex-row items-center justify-end w-[60px] h-full '>
            <Heart className='fill-rose-500 stroke-rose-500' size={20} />
            <p className='text-rose-500 text-xl font-medium'>{hearts}</p>
          </div>
        )}
      </div>
    </div>
  )
}
