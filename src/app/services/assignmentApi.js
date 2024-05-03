import { gql } from "@apollo/client";
import { getClient } from "@/app/services/graphglClient";

const GET_ASSIGNMENT_QUERY = gql`
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

// Define the function to fetch the assignment
export async function getExercise(id) {
  const client = getClient(); // Get the Apollo client
  const response = await client.query({
    query: GET_ASSIGNMENT_QUERY,
    variables: { id },
  });

  return response.data.getAssignment;
}
