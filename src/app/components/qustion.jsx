import { useQuery } from '@apollo/client';
import { useAssignment } from '../context/AssignmentProvider';
import { Radio, RadioGroup, Button } from '@nextui-org/react';
import { GET_QUESTION } from '../graphql/apolloClient';
import Latex from 'react-latex';

export default function Qustion({ assignmentId }) {
  const { answerQuestion, selectedOption, setSelectedOption } = useAssignment();

  const { data, loading, error } = useQuery(GET_QUESTION, {
    variables: { id: assignmentId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleAnswer = () => {
    const chosenOption = data.getAssignment.answerOptions.find(
      (option) => option.text === selectedOption
    );

    if (chosenOption?.correct) {
      answerQuestion(assignmentId, true);
    } else {
      answerQuestion(assignmentId, false);
    }
  };

  return (
    <div className="flex flex-col relative w-[100%]">
      <p className="text-lg">
        <Latex>{data?.getAssignment?.questionText}</Latex>
      </p>

      <RadioGroup className="flex relative w-[100%]">
        {data?.getAssignment?.answerOptions.map((option) => (
          <div
            key={option.text}
            className="w-[100%] h-[2.75rem] flex justify-center items-center rounded-md border-2 border-[#E7E5E4] mt-[.25rem] hover:bg-[#E2E8F9] hover:border-[#A8B9EE] cursor-pointer"
          >
            <Radio
              key={option.text}
              value={option.text}
              checked={selectedOption === option.text}
              onChange={() => setSelectedOption(option.text)}
            >
              <Latex>{option.text}</Latex>
            </Radio>
          </div>
        ))}
      </RadioGroup>

      <Button
        className="bg-[#586FB5] mt-[1rem] text-white"
        onClick={handleAnswer}
      >
        Check
      </Button>
    </div>
  );
}
