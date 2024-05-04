import { gql } from '@apollo/client';

const ASSIGNMENT_QUERY = gql`
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

export async function fetchAssignment(id, client) {
    try {
        const { data } = await client.query({
            query: ASSIGNMENT_QUERY,
            variables: { id }
        });

        if (data.getAssignment !== null) {
            return data.getAssignment;
        } else {
            return false;
        }

    } catch (error) {
        console.error('Error fetching assignment:', error);
        throw error;
    }
}
