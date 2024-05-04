import { useQuery } from '@apollo/client'
import client from '../../../apolloClient'
import exercises from '../../../../exercises.json'
import { GET_ASSIGNMENT } from '../../../lib/graphql/queries'
import React, { useState } from 'react'
import Latex from 'react-latex-next'
import moment from 'moment/moment'
import { toast } from 'sonner'

moment.locale()

export const Assignment = ({
  currentExerciseNo,
  setCurrentExerciseNo,
  validQuestions,
  setValidQuestions,
  setHearts,
}) => {

  const updateSelectedAnswer = (questionId, selectedAnswer) => {
    const newValidQuestions = validQuestions.map(question => 
      question.id === questionId 
        ? { ...question, selectedAnswer } 
        : question
    );
    setValidQuestions(newValidQuestions);
  };

  return (
    <div className='h-[calc(100%-100px)] px-8 md:px-16'>
        <div className='flex md:flex-row flex-col md:items-center justify-between items-start gap-4 md:gap-0 w-full'>
          <h2 className='font-semibold w-1/3 text-2xl whitespace-nowrap'>Exercise {currentExerciseNo + 1}</h2>
          <div className='w-full md:w-1/3 justify-start flex md:justify-center'>
            <p className='text-xs text-neutral-500 whitespace-nowrap'><b>Updated:</b> {moment(validQuestions[currentExerciseNo].updatedAt).format('MMMM Do YYYY, hh:mm')}</p>
          </div>
          <div className='md:w-1/3 w-full flex md:justify-end justify-start'>
            <p className={`
                py-1.5 px-2 md:py-1.5 md:px-3.5 w-fit rounded-full flex flex-row gap-1 font-medium text-xs
                ${
                  validQuestions[currentExerciseNo].difficultyScore <= 1.5 ?
                    'bg-green-100 text-green-700' :
                  validQuestions[currentExerciseNo].difficultyScore <= 2.5 ?
                    'bg-orange-100 text-orange-700' :
                  validQuestions[currentExerciseNo].difficultyScore <= 3.2 ?
                    'bg-rose-100 text-rose-700' :
                    'bg-violet-100 text-violet-700'
                }
              `}
            >
                {validQuestions[currentExerciseNo].difficultyScore.toFixed(1)}
                <span>
                  {
                    validQuestions[currentExerciseNo].difficultyScore <= 1.5 ?
                      'LÄTT' :
                    validQuestions[currentExerciseNo].difficultyScore <= 2.5 ?
                      'MEDEL' :
                    validQuestions[currentExerciseNo].difficultyScore <= 3.2 ?
                      'SVÅRT' :
                      'MARDRÖM'
                    }
                </span>
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <Latex>{validQuestions[currentExerciseNo].questionText}</Latex>
        </div>
        
        <ul className='flex flex-col gap-3 text-black mt-8'>
          {validQuestions[currentExerciseNo].answerOptions.map(answer => (
            <li 
              key={answer.text}
            >
              <button 
                className={`
                  p-4 border-2 rounded-md w-full transition disabled:cursor-not-allowed
                  ${validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).selectedAnswer === answer.text ? 
                    'bg-blue-100 border-blue-300 hover:bg-blue-100' : 
                    'bg-white border-blue-200 hover:bg-blue-50'}
                `}
                disabled={validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).status !== 'untouched'}
                onClick={() => updateSelectedAnswer(validQuestions[currentExerciseNo].id, answer.text)}
              >
                <Latex>{answer.text}</Latex>
              </button>
            </li>
          ))}
        </ul>
        <div className='h-[1px] w-full bg-blue-200 mt-8' />
        <div className='pb-8'>
          <button 
            className='bg-blue-400 w-full p-4  rounded-md font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70 transition'
            disabled={!validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).selectedAnswer || validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).status !== 'untouched'}
            onClick={() => {
              const correctOption = validQuestions[currentExerciseNo].answerOptions.find(option => option.correct === true);
              const updatedQuestions = validQuestions.map((question, index) => {
                if (index === currentExerciseNo) {
                  const isCorrect = correctOption && correctOption.text === question.selectedAnswer;
                  if (!isCorrect) {
                    setHearts(prev => prev - 1);
                    toast.error('Wrong Answer')
                  } else {
                    toast.success('Correct Answer')
                  }
                  return {
                    ...question,
                    status: isCorrect ? "passed" : "failed"
                  };
                }
                return question;
              });
              setValidQuestions(updatedQuestions);
              setCurrentExerciseNo(prev => prev < validQuestions.length - 1 ? prev + 1 : validQuestions.findIndex(q => q.status === 'untouched'))
            }}
          >
            {validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).status === 'untouched' ? 'Check' : 'Already answered'}
          </button>
          {validQuestions.find(q => q.id === validQuestions[currentExerciseNo].id).status !== 'untouched' && (
            <p className='w-full text-center text-sm text-neutral-500 mt-2'>You have answered this exercise and you are not allowed to change it, proceed to an exercise you haven&apos;t done yet.</p>
          )}
        </div>
        
      </div>
  )
}
