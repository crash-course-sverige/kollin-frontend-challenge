import react from "react";

const exercises = [
    { id: 1, name: 'Push-ups', description: 'Perform 20 push-ups' },
    { id: 2, name: 'Sit-ups', description: 'Perform 30 sit-ups' },
    { id: 3, name: 'Squats', description: 'Do 50 squats' }
  ];

  function Page(){
    return (

        <div>
            <h1>Exercise List</h1>
            <ul>
                {exercises.map((exercise) =>(
                    <li key={exercise.id}>
                        <strong>{exercise.name}</strong> - exercise.description
                    </li>
                ))}
            </ul>
        </div>

    )
  }

  export default Page;