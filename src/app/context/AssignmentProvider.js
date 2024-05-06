'use client';

import React, { createContext, useContext, useState } from 'react';
import exercises from '../../../exercises.json';

const AssignmentContext = createContext();

export const useAssignment = () => useContext(AssignmentContext);

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(
    exercises.map((exercise) => ({
      id: exercise,
      isCorrect: null,
    }))
  );

  const [questions, setQuestions] = useState([]);

  const [hearts, setHearts] = useState(3);

  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const currentAssignment = assignments.find(
    (assignment) => assignment.isCorrect === null && assignments.length >= 4
  );

  const answerQuestion = (id, isCorrect) => {
    if (isCorrect === false && hearts > 0) {
      setHearts((prevHearts) => prevHearts - 1);
    }

    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, isCorrect } : assignment
      )
    );
  };

  const selectAssignment = (id) => {
    assignments.find((assignment) => assignment.id === id) &&
      setSelectedAssignment(id);
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        setAssignments,
        currentAssignment,
        answerQuestion,
        selectAssignment,
        selectedAssignment,
        hearts,
        selectedOption,
        setSelectedOption,
        questions,
        setQuestions,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
