import { Check, Heart, RotateCcw, X } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { useState } from "react"
import { SolutionModal } from "./solution-modal"

export const CompletedModal = ({
  validQuestions,
  hearts,
  completedModalActive,
}) => {

  const [solutionModalActive, setSolutionModalActive] = useState(false)
  const [exerciseNo, setExerciseNo] = useState(null)

  return (
    <Dialog open={completedModalActive} >
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <div className="flex">
            <DialogTitle className='text-blue-500 text-2xl w-4/5'>Congratulations!</DialogTitle>
            <div className='flex gap-1 flex-row items-center w-1/5 justify-end h-full '>
              <Heart className='fill-rose-500 stroke-rose-500' size={20} />
              <p className='text-rose-500 text-xl font-medium'>{hearts}</p>
            </div>
          </div>
          <DialogDescription className='py-2 text-[16px]'>
            You have completed the test! Here are your results:
            <ul className="flex flex-col gap-2 my-4">
              {validQuestions.map((q, index) => (
                <li 
                  key={index}
                  className={`w-full flex items-center justify-between font-semibold px-4 py-2 rounded-md text-neutral-800 text-sm 
                    ${q.status === 'passed' && 'bg-green-200'}
                    ${q.status === 'failed' && 'bg-rose-200'}
                  `}
                >
                  <p 
                    className={`
                      flex items-center gap-2
                      ${q.status === 'passed' && 'text-green-900'}
                      ${q.status === 'failed' && 'text-rose-900'}
                    `}
                  >
                    {q.status === 'passed' && <Check size={16} className="text-green-900" />}
                    {q.status === 'failed' && <X size={16} className="text-rose-900" />}
                    Exercise {index + 1}: <span className={`capitalize font-normal`}>
                      {q.status}
                    </span>
                  </p>
                  <div className="flex gap-2 items-center">
                    <Button 
                      size='xs'
                      onClick={() => {
                        setExerciseNo(index)
                        setSolutionModalActive(true)
                      }}
                      className={`
                        text-[10px] py-0.5 px-2 
                        ${q.status === 'passed' && 'bg-green-100 text-green-900 hover:bg-green-50'}
                        ${q.status === 'failed' && 'bg-rose-100 text-rose-900 hover:bg-rose-50'}
                      `}
                    >
                      Show solution
                    </Button>
                  </div>
                  
                </li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="submit" 
            className='bg-blue-500 hover:bg-blue-600 w-full'
            onClick={() => location.reload()}
          >
            <RotateCcw size={16} className="mr-2" /> Retry
          </Button>
        </DialogFooter>
      </DialogContent>
      <SolutionModal 
        solutionModalActive={solutionModalActive}
        setSolutionModalActive={setSolutionModalActive}
        exerciseNo={exerciseNo}
        validQuestions={validQuestions}
      />
    </Dialog>
  )
}
