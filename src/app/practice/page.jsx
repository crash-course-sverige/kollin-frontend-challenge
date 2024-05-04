'use client'

import React, { useEffect, useState } from 'react'
import { AssignmentsList } from './_components/assignments-list';
import { Assignment } from './_components/assignment';
import { RetryModal } from './_components/retry-modal';
import { Toaster } from "../../components/ui/sonner";
import { CompletedModal } from './_components/completed-modal';
import { Loader2Icon, LoaderIcon } from 'lucide-react';

const PracticePage = () => {

  const [validQuestions, setValidQuestions] = useState([])
  const [currentExerciseNo, setCurrentExerciseNo] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [retryModalActive, setRetryModalActive] = useState(false)
  const [completedModalActive, setCompletedModalActive] = useState(false)

  useEffect(() => {
    if(hearts <= 0){
      setRetryModalActive(true)
    }
  }, [hearts])

  useEffect(() => {
    const allQuestionsDone = validQuestions.every(question => question.status !== 'untouched');
    if(allQuestionsDone && validQuestions.length > 0){
      setCompletedModalActive(true)
    }
  }, [validQuestions])
    
  return (
    <div className="h-screen w-screen flex flex-col text-neutral-900 items-center justify-center bg-[#202746]">
      <h1 className='text-white mb-8 font-medium py-2 px-6 rounded-lg bg-[#171c35] text-xl'>Trigonometriska funktioner & identiteter</h1>
      <div className='w-[480px] md:w-[720px] xl:w-[1080px] h-[85%] bg-white rounded-2xl overflow-y-scroll'>
        <AssignmentsList 
          hearts={hearts} 
          validQuestions={validQuestions}
          setValidQuestions={setValidQuestions}
          currentExerciseNo={currentExerciseNo}
          setCurrentExerciseNo={setCurrentExerciseNo}
        />
        {validQuestions.length > 0 ? (
          <Assignment
            currentExerciseNo={currentExerciseNo}
            setCurrentExerciseNo={setCurrentExerciseNo}
            validQuestions={validQuestions}
            setValidQuestions={setValidQuestions}
            setHearts={setHearts}
          />
        ) : (
          <div className='h-[calc(100%-200px)] w-full flex items-center justify-center'>
            <Loader2Icon className='animate-spin text-blue-500' size={36} />
          </div>
        )}
      </div>
      <RetryModal
        retryModalActive={retryModalActive}
        setRetryModalActive={setRetryModalActive}
      />
      <CompletedModal
        validQuestions={validQuestions}
        completedModalActive={completedModalActive}
        setCompletedModalActive={setCompletedModalActive}
        hearts={hearts}
      />
      <Toaster />
    </div>
  )
}

export default PracticePage