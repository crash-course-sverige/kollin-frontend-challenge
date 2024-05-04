'use client';

import { useCallback, useEffect, useState } from 'react';
import Button from './Button';
import ResultModal from './ResultModal';
import AssignmentModal from './AssignmentModal';
import ProgressBar from './ProgressBar';
import AnswerSection from './AnswerSection';
import InformationSection from './InformationSection';

const Gameboard = ({ fetchedAssignments }) => {
  const [assignments, setAssignments] = useState();
  const [currentAssignmentIndex, setCurrentAssignmentIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const mapAssignments = useCallback(() => {
    const mappedAssignments = fetchedAssignments.map((assigntment) => ({
      ...assigntment,
      userAnswer: null,
      userAnswerChecked: false,
    }));

    setAssignments(mappedAssignments);
  }, [fetchedAssignments]);

  useEffect(() => {
    mapAssignments();
  }, [fetchedAssignments, mapAssignments]);

  if (!assignments) {
    return <></>;
  }

  const currentAssignment = assignments[currentAssignmentIndex];

  const handleSelectAnswer = (index) => {
    setAssignments((old) => {
      const newAssignments = [...old];
      newAssignments[currentAssignmentIndex].userAnswer = index;
      return newAssignments;
    });
  };

  const handleCheckAnswer = () => {
    setAssignments((old) => {
      const newAssignments = [...old];
      const userAnswer = newAssignments[currentAssignmentIndex].userAnswer;
      newAssignments[currentAssignmentIndex].userAnswerChecked = true;

      const answeredCorrectly =
        newAssignments[currentAssignmentIndex].answerOptions[userAnswer]
          .correct;

      newAssignments[currentAssignmentIndex].answeredCorrectly =
        answeredCorrectly;

      if (!answeredCorrectly) {
        const newHearts = hearts - 1;
        setHearts(newHearts);
      }

      return newAssignments;
    });

    setShowAssignmentModal(true);
  };

  const checkForAnswers = () => {
    let allQuestionsAnswered = true;

    for (const assignment of assignments) {
      if (!assignment.userAnswerChecked) {
        allQuestionsAnswered = false;
        break;
      }
    }

    return allQuestionsAnswered;
  };

  const nextButton = () => {
    const allQuestionsAnswered = checkForAnswers();

    let onClick;
    let text;

    if (allQuestionsAnswered || hearts === 0) {
      onClick = () => {
        setShowAssignmentModal(false);
        setShowResultModal(true);
      };

      text = 'Se resultat';
    } else {
      onClick = () => {
        let nextAssignment = null;
        let assignmentIndex = currentAssignmentIndex + 1;

        while (nextAssignment === null) {
          if (assignmentIndex >= assignments.length) {
            assignmentIndex = 0;
          }

          if (!assignments[assignmentIndex].userAnswerChecked) {
            nextAssignment = assignmentIndex;
          } else {
            assignmentIndex++;
          }
        }
        setCurrentAssignmentIndex(nextAssignment);
        setShowAssignmentModal(false);
      };

      text = 'Nästa fråga';
    }

    return <Button text={text} onClick={onClick} />;
  };

  const handleReset = () => {
    mapAssignments();
    setCurrentAssignmentIndex(0);
    setHearts(3);
    setShowAssignmentModal(false);
    setShowResultModal(false);
  };

  return (
    <>
      {showAssignmentModal && (
        <AssignmentModal
          currentAssignment={currentAssignment}
          checkForAnswers={checkForAnswers}
          nextButton={nextButton()}
        />
      )}
      {showResultModal && (
        <ResultModal
          assignments={assignments}
          handleReset={handleReset}
          gameOver={hearts === 0}
        />
      )}
      <ProgressBar
        assignments={assignments}
        currentAssignmentIndex={currentAssignmentIndex}
        setCurrentAssignmentIndex={(index) => {
          setCurrentAssignmentIndex(index);
        }}
        hearts={hearts}
      />
      <p className='h-full overflow-auto'>{currentAssignment.questionText}</p>
      <AnswerSection
        handleCheckAnswer={handleCheckAnswer}
        handleSelectAnswer={handleSelectAnswer}
        currentAssignment={currentAssignment}
      />
      <InformationSection currentAssignment={currentAssignment} />
    </>
  );
};

export default Gameboard;
