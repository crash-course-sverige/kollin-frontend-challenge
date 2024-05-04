import { Heart, RotateCcw } from "lucide-react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"

export const RetryModal = ({
  retryModalActive,
}) => {

  return (
    <Dialog open={retryModalActive} >
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <div className="flex">
            <DialogTitle className='text-blue-500 text-2xl w-4/5'>You are out of hearts!</DialogTitle>
            <div className='flex gap-1 flex-row items-center w-1/5 justify-end h-full '>
              <Heart className='fill-rose-500 stroke-rose-500' size={20} />
              <p className='text-rose-500 text-xl font-medium'>0</p>
            </div>
          </div>
          <DialogDescription className='py-2 text-[16px]'>
            You have used all of your hearts. But don&apos;t worry, you can always retry!
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
    </Dialog>
  )
}
