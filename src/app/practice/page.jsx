import Link from "next/link";

import exerciseIds from "../../../exercises.json";
import { getExercise } from "../services/assignmentApi";

const ExerciseList = async () => {
  const responses = await Promise.all(exerciseIds.map((id) => getExercise(id)));
  const assignments = responses.filter(Boolean);

  return (
    <div>
      {assignments.map((assignment) => (
        <div key={assignment.id}>
          <Link href={`practice/${assignment.id}`}>Övning</Link>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
