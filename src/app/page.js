"use client";
import exercises from "../../exercises.json";
import { useEffect, useState } from "react";
import fetchAPI from "./API";
import Image from "next/image";
import Card from "./components/Card";
import DumbComponent from "./components/DumbComponent";

export default function Home() {
  const assignmentIDs = exercises;
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  //add lives

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        let data = await fetchAPI(assignmentIDs);
        console.log("fetched data:", data);

        setAssignments(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(null);
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignmentsData();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-8 bg-[#586FB5]">
      {isLoading || assignments.length <= 0 ? (
        <Image
          src="https://media0.giphy.com/media/CrrOqaQFuhnTdByaYa/giphy.gif?cid=6c09b9527c05r8221e4i2u39tm1kk9fys4699msfr0wb61wq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          alt="loading"
          width={80}
          height={80}
        />
      ) : (
        <div className="flex justify-center items-center flex-col h-screen">
          <p className="pt-8 pb-16 text-white text-4xl">
            Trigonometriska funktioner & identiteter
          </p>
          {Content()}
        </div>
      )}
    </div>
  );

  function Content() {
    if (!!assignments && assignments.length > 0 && !!assignments[index])
      return (
        <Card
          assignment={assignments[index]}
          assignments={assignments}
          key={assignments[index].id}
          index={index}
          answers={answers}
          setAnswers={setAnswers}
        />
      );
  }
}
