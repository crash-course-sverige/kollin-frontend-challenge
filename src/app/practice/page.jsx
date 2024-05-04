"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import exercises from "../../../exercises.json"
import { fetchData } from "../../../ApiCall"
import { useExerciseContext } from './globalStates'
import ExerciseList from './exerciseList'
import './style.css'

export default function List() {
    const {exerciseData,setExerciseData}= useExerciseContext();
    
    useEffect(() => {
        async function getData(id) {
             fetchData(id).then(
                (response) => setExerciseData((prevData) => {
                    const newMap = new Map(prevData)
                    if (!newMap.has(id) && response.data.data.getAssignment != null) {
                        newMap.set(id, response.data.data.getAssignment)
                    }
                    return newMap
                })
            ).catch((error) => console.log(error))
        }
        exercises.forEach(async (id) =>  getData(id))
    }, [])  
    useEffect(()=>{
        if(exerciseData.size>0){
            const idKey=exerciseData.keys().next().value
            route.push(`/practice/${idKey}`)
        }
    },[exerciseData])

    const route=useRouter()

    return (
        <>
          <ExerciseList />
        </>
    )
}

