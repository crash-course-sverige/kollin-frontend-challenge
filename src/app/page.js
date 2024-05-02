"use client";
import exercises from "../../exercises.json";
import { useEffect, useState } from "react";
import fetchAPI from "./API";
import Image from "next/image";

export default function Home() {
  const assignmentIDs = exercises;
  const [isLoading, setIsLoading] = useState(true);
  const [assignements, setAssignements] = useState([]);

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        let data = await fetchAPI(assignmentIDs);
        console.log("fetched data:", data);

        setAssignements(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(null);
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignmentsData();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-24 bg-[#202746]">
      {isLoading || assignements.length <= 0 ? (
        <Image
          src="https://media0.giphy.com/media/CrrOqaQFuhnTdByaYa/giphy.gif?cid=6c09b9527c05r8221e4i2u39tm1kk9fys4699msfr0wb61wq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          alt="loading"
          width={80}
          height={80}
        />
      ) : (
        <>{Content()}</>
      )}
    </div>
  );

  function Content() {
    if (!!assignements && assignements.length > 0)
      return assignements.map(
        (assignment) =>
          !!assignment && (
            <div key={assignment.id}>
              <h1>{assignment.questionText}</h1>
              <p>{assignment.solutionText}</p>
            </div>
          )
      );
  }
}
