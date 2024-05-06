'use client';

import Qustion from '../components/qustion';
import ProgressBar from '../components/ProgressBar';
import { useAssignment } from '../context/AssignmentProvider';
import Hearts from '../components/hearts';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/apolloClient';

export default function PracticePage() {
  const { currentAssignment, selectedAssignment, assignments } =
    useAssignment();

  return (
    <ApolloProvider client={client}>
      <div className="h-[100vh] bg-[#596fb4] flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl mb-[3rem]">
          Trigonometriska funktioner & identiteter
        </h1>
        <div className="w-[64rem] bg-white rounded-tl-3xl rounded-3xl h-[32rem] text-black flex flex-col pt-[2rem] pb-[1rem] pl-[8rem] pr-[8rem]">
          <div className="flex gap-2 justify-center ">
            <ProgressBar />
            <Hearts />
          </div>
          <Qustion
            assignmentId={
              selectedAssignment ?? currentAssignment?.id ?? assignments[0].id
            }
          />
        </div>
      </div>
    </ApolloProvider>
  );
}
