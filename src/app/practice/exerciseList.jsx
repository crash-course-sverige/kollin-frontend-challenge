"use client"

import { useExerciseContext } from "./globalStates"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"

export default function ExerciseList({props}) {
    const {exerciseData,lives,currentQuestion,answer} =useExerciseContext()
    const router=useRouter()
    const switchQuestion=(key)=>{
        router.push(`/practice/${key}`)
    }
    return (
        <div className="exercise-list flex flex-row justify-center m-4">
            <ul className='exercises grid grid-cols-5 gap-2'>
                {[...exerciseData].map(([key, record], id) => (
                    <li 
                    className={`${currentQuestion === key ? 'border-2 border-blue-400 exercise-box' : 'exercise-box'}
            ${answer.has(key) ? (exerciseData.get(key).answerOptions[answer.get(key)].correct ? 'green-background' : 'orange-background') : ''}`}
                    key={id} 
                    onClick={()=>switchQuestion(key)}>
                    </li>
                ))}
            </ul>
            <div className='life-tab'>
                <FontAwesomeIcon className='life-rose' icon={faHeart} />
                <FontAwesomeIcon className='life-pale' icon={faHeart} />
                <p className="lives-count">
                    {lives}
                </p>
            </div>
        </div>
    )
}