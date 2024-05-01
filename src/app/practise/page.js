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

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer your-very-long-jwt-token-here",
            },
            body: JSON.stringify(QUERY),
        });

        const data = await response.json();

        if (data.errors || !data.data.getAssignment) {
            console.error(`Error fetching exercise with ID ${id}:`, data.errors || "No data found.");
            return { error: true, details: data.errors || "No data found" };
        }

        return data.data.getAssignment;
    } catch (error) {
        console.error(`Error fetching exercise with ID ${id}:`, error);
        return { error: true, details: "Failed to fetch data due to an unexpected error." };
    }
};

const fetchExercises = async () => {
    const fetchExercises = async () => {
        try {
            const fetchedExercises = await Promise.all(exerciseIds.map((id) => fetchExercise(id)));
            const validExercises = fetchedExercises.filter((exercise) => !exercise.error);
            return validExercises;
        } catch (error) {
            console.error("Failed to fetch exercises:", error);
        }
    };
};

const Page = async () => {
    const exercises = await fetchExercises();

    return <ExercisesQuiz exercises={exercises} />;
};

export default Page;
