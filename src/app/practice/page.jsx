import ExerciseView from "@/components/ExerciseView";

import Ids from "../../../exercises.json";

const exerciseIds = Ids;

async function getData() {
  const result = [];

  const endpoint =
    "https://jgsbshesm5advigzznyid7juny.appsync-api.eu-north-1.amazonaws.com/graphql";

  for (const id of exerciseIds) {
    const query = `query {
        getAssignment(id: "${id}") {
          id
          difficultyScore
          questionText
          solutionText
          hints
          answerOptions {
            id
            text
            correct
          }
          createdAt
          updatedAt
        }
      }`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhTVVAwa3ZaUHl3S296bkU1SkNGMW1KbnJnT29CdTRjVHBTMDViQWc4RXMifQ.eyJzdWIiOiIyNjQyMSIsImlkIjoyNjQyMSwiZiI6IjlhOTJmNjMxYzNmNjNkZDgzOGNiNzZjZTcwNDZiNmM5IiwibWF4QWxsb3dlZERldmljZXMiOjEsImdyb3VwcyI6WyJQVUJMSUMiXSwiYXVkIjoiaW50ZXJuYWwiLCJleHAiOjE3MTcxMDE0MDgsImlhdCI6MTcxNDUwOTQwOCwiaXNzIjoiaHR0cHM6Ly9hcGkudG50b3Iuc2Uvb2lkYyJ9.QmNBGduFAihbzKd2ETRQ1DukxHta8_G-CRK8RHtLhAqFDcD9pcK6mbdZCRYx-TKG2Ovyi1LS7MpcG-mYNsq8kNrMOHWVgJtDNyJEjgdYQMFZwsfGikKu5KRNHHf1j8g8tYqEcT7Yw_Azv9uMeiGU1CcL1jGRBhbaqVo3G1pXCxVupHbHsKQn237DC7n2fbaiVVM2S2J1bOFSATbfj35yDJmgZzLOQWqGebl4UkfFZcgWImWcj1IwVRogrCWRK5HZbeElgIu02mlcD8XrFpOV1oFgEnMiMmHjdbgPvm_RX4-FkJTJXUXflVRQYhBFVtOH9bf-t1FTY8FM7kV19uRhHw",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

    try {
      const response = await fetch(endpoint, options);
      const { data } = await response.json();

      if (data.getAssignment) {
        result.push(data.getAssignment);
      } else {
        console.error(`No data found for id: ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return result;
}

export default async function ExerciseList() {
  const exerciseData = await getData();

  return (
    <div>
      <h1 className="text-5xl text-[#FDFDFC] text-center pt-10">
        Trigonometriska funktioner & identiteter
      </h1>

      <ExerciseView exerciseData={exerciseData} />
    </div>
  );
}
