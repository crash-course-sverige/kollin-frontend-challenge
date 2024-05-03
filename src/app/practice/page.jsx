import ExercisePage from './components/ExercisePage';

const fetchExercises = async () => {
	const API_URL = 'https://jgsbshesm5advigzznyid7juny.appsync-api.eu-north-1.amazonaws.com/graphql';
	const token = process.env.AUTH_TOKEN;

	const ids = [
		'bde984b3-7e98-42ad-8650-bd08d9c64473',
		'b1cdace3-479d-4c35-8bf4-9dadc5bdc71a',
		'a983b41f-8b70-4970-8466-c0545ec1d3d0',
		'dc732465-96d5-4230-91b9-f2f9cc5a30a9',
		'cb6393ff-2f29-44c1-91ee-9da296b1edd2',
		'9de29654-bc7a-4552-a367-f438cbd1ce0d',
	];

	try {
		const promises = ids.map(async (id) => {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
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
					variables: { id },
				}),
			});

			const responseData = await response.json();
			if (responseData.errors || !responseData.data.getAssignment) {
				console.error(`Error fetching data with following id: ${id}`, responseData.errors);
				return { error: true, message: 'Failed to fetch due to invalid id' };
			}

			return responseData.data.getAssignment;
		});

		const allFetchedExercises = await Promise.all(promises);
		const validatedExercises = allFetchedExercises.filter((exercise) => !exercise.error);
		return validatedExercises;
	} catch (error) {
		console.error('Error fetching exercises:', error);
	}
};

export default async function Page() {
	const exercises = await fetchExercises();

	return (
		<div>
			<ExercisePage exercises={exercises}></ExercisePage>
		</div>
	);
}
