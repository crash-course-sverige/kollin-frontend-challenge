import ExercisesQuiz from "./components/ExercisesQuiz";

const exerciseIds = ["bde984b3-7e98-42ad-8650-bd08d9c64473", "b1cdace3-479d-4c35-8bf4-9dadc5bdc71a", "a983b41f-8b70-4970-8466-c0545ec1d3d0", "dc732465-96d5-4230-91b9-f2f9cc5a30a9", "cb6393ff-2f29-44c1-91ee-9da296b1edd2", "9de29654-bc7a-4552-a367-f438cbd1ce0d"];

const fetchExercise = async (id) => {
    const API_URL = "https://jgsbshesm5advigzznyid7juny.appsync-api.eu-north-1.amazonaws.com/graphql";

    const QUERY = {
        query: `
            query GetAssignment($id: ID!) {
                getAssignment(id: $id) {
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
            }
        `,
        variables: { id: id },
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlhTVVAwa3ZaUHl3S296bkU1SkNGMW1KbnJnT29CdTRjVHBTMDViQWc4RXMifQ.eyJzdWIiOiIyNjQyMSIsImlkIjoyNjQyMSwiZiI6IjlhOTJmNjMxYzNmNjNkZDgzOGNiNzZjZTcwNDZiNmM5IiwibWF4QWxsb3dlZERldmljZXMiOjEsImdyb3VwcyI6WyJQVUJMSUMiXSwiYXVkIjoiaW50ZXJuYWwiLCJleHAiOjE3MTcxMDE0MDgsImlhdCI6MTcxNDUwOTQwOCwiaXNzIjoiaHR0cHM6Ly9hcGkudG50b3Iuc2Uvb2lkYyJ9.QmNBGduFAihbzKd2ETRQ1DukxHta8_G-CRK8RHtLhAqFDcD9pcK6mbdZCRYx-TKG2Ovyi1LS7MpcG-mYNsq8kNrMOHWVgJtDNyJEjgdYQMFZwsfGikKu5KRNHHf1j8g8tYqEcT7Yw_Azv9uMeiGU1CcL1jGRBhbaqVo3G1pXCxVupHbHsKQn237DC7n2fbaiVVM2S2J1bOFSATbfj35yDJmgZzLOQWqGebl4UkfFZcgWImWcj1IwVRogrCWRK5HZbeElgIu02mlcD8XrFpOV1oFgEnMiMmHjdbgPvm_RX4-FkJTJXUXflVRQYhBFVtOH9bf-t1FTY8FM7kV19uRhHw",
        },
        body: JSON.stringify(QUERY),
    });
    const data = await response.json();

    if (data.errors || !data.data.getAssignment) {
        console.error(`Error fetching exercise with ID ${id}:`, data.errors || "No data found.");
        return { error: true, details: data.errors || "No data found" };
    }

    return data.data.getAssignment;
};

const fetchExercises = async () => {
    const fetchedExercises = await Promise.all(exerciseIds.map((id) => fetchExercise(id)));
    const validExercises = fetchedExercises.filter((exercise) => !exercise.error);
    return validExercises;
};

const Page = async () => {
    const exercises = await fetchExercises();

    return <ExercisesQuiz exercises={exercises} />;
};

export default Page;
