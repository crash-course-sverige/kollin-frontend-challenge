import { useQuery, gql } from '@apollo/client';
import client from '../lib/apolloClient'; // Check this path based on your actual structure

const GET_ASSIGNMENT = gql`
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
`;

const AssignmentItem = ({ id }) => {
  if (!id) return <p>No ID provided</p>; // Prevent querying with null/undefined ID

  const { data, loading, error } = useQuery(GET_ASSIGNMENT, { 
    variables: { id },
    client
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data for ID {id}: {error.message}</p>;
  if (!data || !data.getAssignment) return <p>No data available for ID {id}</p>;

  const { questionText, difficultyScore } = data.getAssignment;

  return (
    <div>
      <h2>{questionText} (Difficulty: {difficultyScore})</h2>
    </div>
  );
};

export default AssignmentItem;
