"use client";
import excersises from "../../../exercises.json";
import GetAssignmentQuery from "../../graphql/GetAssignment.query";
import { useQuery } from "@apollo/client";
import { nanoid } from "nanoid";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export function Assignment({ id }) {
  const { data, loading, error } = useQuery(GetAssignmentQuery, {
    context: {
      headers: {
        Authorization: `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhTVVAwa3ZaUHl3S296bkU1SkNGMW1KbnJnT29CdTRjVHBTMDViQWc4RXMifQ.eyJzdWIiOiIyNjQyMSIsImlkIjoyNjQyMSwiZiI6IjlhOTJmNjMxYzNmNjNkZDgzOGNiNzZjZTcwNDZiNmM5IiwibWF4QWxsb3dlZERldmljZXMiOjEsImdyb3VwcyI6WyJQVUJMSUMiXSwiYXVkIjoiaW50ZXJuYWwiLCJleHAiOjE3MTcxMDE0MDgsImlhdCI6MTcxNDUwOTQwOCwiaXNzIjoiaHR0cHM6Ly9hcGkudG50b3Iuc2Uvb2lkYyJ9.QmNBGduFAihbzKd2ETRQ1DukxHta8_G-CRK8RHtLhAqFDcD9pcK6mbdZCRYx-TKG2Ovyi1LS7MpcG-mYNsq8kNrMOHWVgJtDNyJEjgdYQMFZwsfGikKu5KRNHHf1j8g8tYqEcT7Yw_Azv9uMeiGU1CcL1jGRBhbaqVo3G1pXCxVupHbHsKQn237DC7n2fbaiVVM2S2J1bOFSATbfj35yDJmgZzLOQWqGebl4UkfFZcgWImWcj1IwVRogrCWRK5HZbeElgIu02mlcD8XrFpOV1oFgEnMiMmHjdbgPvm_RX4-FkJTJXUXflVRQYhBFVtOH9bf-t1FTY8FM7kV19uRhHw`,
      },
    },
    variables: {
      id,
    },
  });

  if (loading) {
    return <div>loading.....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const questionText = data.getAssignment.questionText;
  const answerOptions = data.getAssignment.answerOptions;
  const options = answerOptions.map((o) => ({ text: o.text, id: nanoid() }));

  return (
    <div>
      <div class="relative min-w-[80%] mb-10 flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
        <div class="p-12">
          <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {questionText}
          </p>
        </div>
      </div>

      <RadioGroup>
        <nav className="min-w-[80%] flex flex-col gap-2 p-2 font-sans text-base font-normal text-blue-gray-700">
          {options.map((option) => (
            <div
              key={nanoid()}
              role="button"
              className="min-w-[40%] flex items-center w-full p-3 leading-tight transition-all 
            rounded-lg outline-none text-start hover:bg-blue-gray-50 
            hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 
            focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 
            active:bg-opacity-80 active:text-blue-gray-900  border-2 border-[#E7E5E4]"
            >
              <Radio
                key={nanoid()}
                value={option.text}
                className="min-w-[100%] "
              >
                {option.text}
              </Radio>
            </div>
          ))}
        </nav>
      </RadioGroup>
      <Button className="check-btn mt-10">Check</Button>
    </div>
  );
}
