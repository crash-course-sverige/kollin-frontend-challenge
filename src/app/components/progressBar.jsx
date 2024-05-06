import { useAssignment } from '../context/AssignmentProvider';

export default function ProgressBar() {
  const { assignments, selectAssignment } = useAssignment();

  return (
    <div className="mb-[2rem]">
      {assignments.map((assignment) => (
        <button
          key={assignment.id}
          className={`min-w-[8.5rem] h-[1rem] focus:border-solid focus:border-1 focus:border-[#2F80ED]  rounded-full text-white ${
            assignment.isCorrect === true
              ? 'bg-[#66C61C]'
              : assignment.isCorrect === false
              ? 'bg-[#F79009]'
              : 'bg-[#D7D3D0]'
          }`}
          onClick={() => selectAssignment(assignment.id)}
        ></button>
      ))}
    </div>
  );
}
