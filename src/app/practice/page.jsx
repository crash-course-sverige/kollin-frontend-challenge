"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import assignmentIds from "../../../exercises.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "./modal";

const Page = () => {
  const [exercises, setExercises] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAllAssignments();
  }, []);

  const fetchOneAssignment = async (id) => {
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

    const variables = { id: id };

    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_API_URL}`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        data: {
          query: query,
          variables: variables,
        },
      });

      return response.data.data.getAssignment;
    } catch (error) {
      console.error("Error fetching assignment:", error);
      return null;
    }
  };

  const fetchAllAssignments = async () => {
    try {
      const promises = assignmentIds.map((id) => fetchOneAssignment(id));
      const results = await Promise.all(promises);
      const validExcercises = results.filter((result) => result !== null);
      setExercises(validExcercises);
      console.log(validExcercises);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const selectNextExercise = () => {
	const nextIndex = currentExIndex + 1;
	if (nextIndex < exercises.length) {
	  setSelectedExercise(exercises[nextIndex]);
	  setCurrentExIndex(nextIndex);
	} else {
	  setMessage("Inga fler frågor!")
	  setModalOpen(!modalOpen);
	}
  };

  const selectPrevExercise = () => {
    const prevIndex = currentExIndex - 1;
    if (prevIndex >= 0) {
        setSelectedExercise(exercises[prevIndex]);
        setCurrentExIndex(prevIndex);
    } else {
        setMessage("Inga fler tidigare frågor!");  
        setModalOpen(false); 
    }
};


  return (
    <div className="page">
      <h1>Trigonometriska funktioner & identiteter</h1>
      <div className="page-container">
        <Accordion>
          {exercises &&
            exercises.map((ex, index) => {
              return (
                <>
                  <Accordion.Item key={index} eventKey={index}>
                    <Accordion.Header>
                      Övning #{index + 1}
					  <Button
					  style={{marginLeft: "10px"}}
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedExercise(ex);
						  setCurrentExIndex(index);
                        }}
                      >
                        Välj
                      </Button>
					  <span style={{marginLeft: "30px"}}>Svårighetsgrad: {ex.difficultyScore}</span>
					  
                    </Accordion.Header>
                    <Accordion.Body>{ex.questionText}</Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
        </Accordion>
		<h2>{message}</h2>
      </div>

      {modalOpen && (
        <div className="modal overlay active">
          <Modal
		  exercises={exercises}
            exercise={selectedExercise}
			currentIndex={currentExIndex}
            openModal={() => {
              setModalOpen(!modalOpen);
              setSelectedExercise(null);
            }}
			onNextExercise={selectNextExercise}
			onPrevExercise={selectPrevExercise}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
