import React from 'react'
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import Latex from 'react-latex-next'

export const SolutionModal = ({
  solutionModalActive,
  setSolutionModalActive,
  exerciseNo,
  validQuestions,
}) => {
  return (
    <Dialog open={solutionModalActive} >
      <DialogContent className="sm:max-w-[675px]">
        <DialogHeader>
          <div className="flex">
            <DialogTitle className='text-blue-500 text-2xl w-4/5'>Solution for Exercise {exerciseNo + 1}</DialogTitle>
          </div>
          <DialogDescription className='py-2 text-[16px]'>
            <div className='mb-12'>
              <h3 className='font-semibold mb-2'>Exercise</h3>
              <Latex>{validQuestions[exerciseNo]?.questionText}</Latex>
            </div>
            <div className='mb-12'>
              <h3 className='font-semibold mb-2'>Solution</h3>
              <Latex>{validQuestions[exerciseNo]?.solutionText}</Latex>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="submit" 
            className='bg-blue-500 hover:bg-blue-600 w-full'
            onClick={() => setSolutionModalActive(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}