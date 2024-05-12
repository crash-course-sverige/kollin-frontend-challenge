"use client";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import MainButton from "../components/Buttons/MainButton";
import OptionPressable from "../components/Buttons/OptionPressable";
import "./styles.css";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import Title from "../components/Headers/Title";
import Difficulty from "../components/Headers/Difficulty";

const ids = [
  "bde984b3-7e98-42ad-8650-bd08d9c64473",
  "b1cdace3-479d-4c35-8bf4-9dadc5bdc71a",
  "a983b41f-8b70-4970-8466-c0545ec1d3d0",
  "dc732465-96d5-4230-91b9-f2f9cc5a30a9",
  "cb6393ff-2f29-44c1-91ee-9da296b1edd2",
  "9de29654-bc7a-4552-a367-f438cbd1ce0d",
];

const scoreToColor = { 1: "#66C61C", 2: "#FFD700", 3: "#F79009", 4: "#A020F0" };

export default function CrashCourse() {
  const [assignments, setAssignments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [lives, setLives] = useState(3);

  async function getAssignments(assignmentId) {
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

    const query = `
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

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_AUTH,
        },
        body: JSON.stringify({
          query,
          variables: { id: assignmentId },
        }),
      });
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return;
    }
  }
  useEffect(() => {
    const fetchAssignments = async () => {
      const assignmentPromises = ids.map((id) => getAssignments(id));
      try {
        const assignmentsData = await Promise.all(assignmentPromises);
        const filteredAssignments = assignmentsData.filter(
          (assignment) => assignment.getAssignment !== null
        );
        const assignmentsWithFlags = filteredAssignments.map((assignment) => ({
          ...assignment,
          answered: false,
          correct: null,
        }));
        setAssignments(assignmentsWithFlags);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignments();
  }, []);

  const handleProgressItemClick = (index) => {
    setCurrentIndex(index);
    setAnswerIndex(0);
  };

  const handleAnswerClick = (index, option) => {
    setAnswerIndex(index);
    setAnswer(option);
  };

  const handleAnswerCheck = (option) => {
    const correct = option.correct;
    const updatedAssignments = [...assignments];
    updatedAssignments[currentIndex].answered = true;
    updatedAssignments[currentIndex].correct = correct;
    setAssignments(updatedAssignments);
  };

  return (
    <div className="OuterWindow">
      <Title title={"Trigonometriska funktioner & Identiteter"} />
      <div className="MainContainer">
        <div className="ProgressBar">
          {assignments.map((assignment, index) => (
            <ProgressBar
              totalItems={assignments.length > 0 ? assignments.length : 1}
              key={assignment.getAssignment.id}
              difficulty={assignment.getAssignment.difficultyScore}
              current={currentIndex == index}
              onClick={() => handleProgressItemClick(index)}
              correct={assignment.correct}
              attempted={assignment.answered}
            />
          ))}
          <div style={{display:"flex", flexDirection:"row"}}><span style={{}}>Heart</span> <span>{lives}</span></div>
        </div>

        <div className="DifficultyContainer">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span>Question:</span>
            {currentIndex + 1}
          </div>
          <Difficulty
            difficultyScore={
              assignments[currentIndex]?.getAssignment.difficultyScore
            }
            color={
              assignments.length > 0
                ? scoreToColor[
                    Math.round(
                      assignments[currentIndex]?.getAssignment.difficultyScore
                    )
                  ]
                : "white"
            }
          />
        </div>

        <div className="AssignmentContainer">
          <Latex>
            {assignments.length > 0
              ? assignments[currentIndex].getAssignment.questionText
              : ""}
          </Latex>
        </div>

        <div className="OptionContainer">
          {assignments.length > 0
            ? assignments[currentIndex]?.getAssignment.answerOptions.map(
                (option, index) => (
                  <OptionPressable
                    text={option.text}
                    key={option.id}
                    onClick={() => handleAnswerClick(index, option)}
                    active={answerIndex == index}
                  />
                )
              )
            : ""}
        </div>

        <MainButton
          prompt={"Check"}
          onClick={() => {
            handleAnswerCheck(answer);
          }}
        />
      </div>
    </div>
  );
}
