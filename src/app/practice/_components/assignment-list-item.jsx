import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import client from '../../../apolloClient';
import { GET_ASSIGNMENT } from '../../../lib/graphql/queries';

export const AssignmentListItem = ({
  currentExerciseNo,
  setCurrentExerciseNo,
  exerciseId,
  validQuestions,
  setValidQuestions,
  currentExerciseId,
  setCurrentExerciseId,
}) => {

  const { loading, data } = useQuery(
    GET_ASSIGNMENT, { 
      variables: {
        id: exerciseId,
      },
      client
    }
  )

  useEffect(() => {
    if (data && data.getAssignment) {
      setValidQuestions(prev => {
        if (!prev.includes(data.getAssignment.id)) {
          return [...prev, 
            {
              ...data.getAssignment,
              status: 'untouched',
              selectedAnswer: null
            }
          ].sort((a, b) => a.difficultyScore - b.difficultyScore)
        }
        return prev;
      });
    }
  }, [data])

  if (loading) {
    return null
  }
  
  let thisListItem = validQuestions[validQuestions.findIndex(q => q.id === data.getAssignment?.id)]

  return (
    data.getAssignment && validQuestions.length > 0 && (
      <button 
        className={`
          flex w-full h-[32px] items-center justify-center rounded-md text-xs font-medium text-neutral-800
          ${validQuestions[currentExerciseNo].id === data.getAssignment.id && 'border-[3px] border-blue-300'}
          ${
            thisListItem?.status === 'failed' 
              ? 'bg-rose-300' 
            : thisListItem?.status === 'passed' 
              ? 'bg-green-300' 
              : 'bg-gray-200' 
              }
        `}
        onClick={() => setCurrentExerciseNo(validQuestions.findIndex(q => q.id === data.getAssignment.id))}
      >
        {validQuestions.findIndex(q => q.id === data.getAssignment.id) + 1}
      </button>
    )
    
  )
}