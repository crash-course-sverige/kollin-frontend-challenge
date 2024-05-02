import exercises from '../../../exercises.json';
import Gameboard from './Gameboard';

const getAssignment = async (id) => {
  try {
    const url = process.env.GRAPHQL_ENDPOINT;
    const headers = {
      'content-type': 'application/json',
      Authorization: process.env.GRAPHQL_KEY,
    };
    const query = `query GetAssignment($id: ID!) {
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
        }`;

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables: { id } }),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const assignment = await response.json();

      return assignment.data.getAssignment;
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllAssignments = async () => {
  const fetchedAssignments = [];

  for (const id of exercises) {
    const assignment = await getAssignment(id);
    if (assignment) {
      fetchedAssignments.push(assignment);
    } else {
      console.error(`Resource with id ${id} could not be found`);
    }
  }

  return fetchedAssignments;
};

const Page = async () => {
  const assignments = await getAllAssignments();

  return (
    <div className='flex flex-col items-center justify-end h-screen text-slate-900'>
      <h1 className='text-5xl mb-8 text-light'>
        Trigonometriska funktioner & identiteter
      </h1>
      <Gameboard assignments={assignments} />
    </div>
  );
};

export default Page;
