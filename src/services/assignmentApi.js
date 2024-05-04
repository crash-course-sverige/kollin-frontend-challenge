import { gql } from "@apollo/client";
import { getClient } from "@/services/graphglClient";
import exerciseIds from "../../exercises.json";

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

export async function getAssignment(id) {
  const client = getClient();
  const response = await client.query({
    query: GET_ASSIGNMENT_QUERY,
    variables: { id },
  });
  const assignment = response.data.getAssignment;
  if (!assignment) {
    return assignment;
  }
  const answerOptions = assignment.answerOptions;
  const enriched = {
    ...assignment,
    answerOptions: answerOptions.map((x, i) => ({
      ...x,
      id: (i + 1).toString(),
    })),
  };
  return enriched;
}

export async function getAssignments() {
  const responses = await Promise.all(
    exerciseIds.map((id) => getAssignment(id))
  );
  return responses.filter(Boolean);
}
