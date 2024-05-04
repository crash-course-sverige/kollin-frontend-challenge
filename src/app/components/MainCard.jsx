import { Card, CardBody } from "@nextui-org/card";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import { useState, useEffect } from "react";
import HeartIcon from "./icons/Heart";
import KatexSpan from "./KatexSpan";

const MainCard = ({
  question,
  answers,
  exercises,
  difficulty,
  hint,
  onExerciseChange,
  exerciseIndex,
  questionStatus,
  setQuestionStatus,
  livesleft,
  setLivesleft,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const checkAnswer = () => {
    const answer = answers.find((ans) => ans.text === selectedAnswer);
    if (answer.correct) {
      setIsCorrect(true);
      const updatedStatus = [...questionStatus];
      updatedStatus[exerciseIndex] = true;
      setQuestionStatus(updatedStatus);
    } else {
      setIsCorrect(false);
      setLivesleft(livesleft - 1);
      const updatedStatus = [...questionStatus];
      updatedStatus[exerciseIndex] = false;
      setQuestionStatus(updatedStatus);
    }
  };

  useEffect(() => {
    if (livesleft === 0) {
      setGameOver(true);
    }
  }, [livesleft]);

  const restartQuestion = () => {
    setIsCorrect(null);
    setQuestionStatus(new Array(exercises.length).fill(null));
    setLivesleft(3);
    setGameOver(false);
    setCurrentHintIndex(0);
    onExerciseChange(0);
  };

  const handleNextHint = () => {
    if (currentHintIndex < hint.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const handlePrevHint = () => {
    if (currentHintIndex < hint.length + 1) {
      setCurrentHintIndex(currentHintIndex - 1);
    }
  };

  const handleProgressBarClick = (index) => {
    onExerciseChange(index);
  };

  const radioGroup = answers.map((answer, index) => (
    <Radio
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse min-w-[100%] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
      value={answer.text}
      key={index}
    >
      <KatexSpan className="m-6" text={answer.text}></KatexSpan>
    </Radio>
  ));

  const progressBars = exercises.map((exercise, index) => (
    <div
      key={index}
      className={`h-[24px] flex-grow rounded-md cursor-pointer ${
        questionStatus[index] === true
          ? "bg-green-500"
          : questionStatus[index] === false
            ? "bg-red-500"
            : "bg-gray-200"
      } ${exerciseIndex === index ? "outline outline-offset-2 outline-2 outline-blue-500" : ""}`}
      onClick={() => handleProgressBarClick(index)}
    />
  ));

  return (
    <Card className="flex justify-center min-w-[600px] max-w-[800px] p-10">
      <div className="flex justify-center items-center gap-3">
        {progressBars}
        <HeartIcon width="30px" height="30px" fill="red" />
        <div className="text-red-500 text-xl font-semibold">{livesleft}</div>
      </div>
      <CardBody>
        <div className="flex justify-between">
          <h2 className="mb-6">Difficulty Score: {difficulty}</h2>
          {hint && <Button onPress={onOpen}>Show hint</Button>}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Hint
                  </ModalHeader>
                  <ModalBody>
                    <p>{hint[currentHintIndex]}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    {currentHintIndex > 0 && (
                      <Button onClick={handlePrevHint}>Previous hint</Button>
                    )}
                    {currentHintIndex < hint.length - 1 && (
                      <Button color="primary" onClick={handleNextHint}>
                        Next hint
                      </Button>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <KatexSpan className="m-6" text={question}></KatexSpan>
        <div className="flex flex-col gap-4">
          <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer}>
            {radioGroup}
          </RadioGroup>
        </div>
        {isCorrect !== null && (
          <Chip className="mt-3" color={isCorrect ? "success" : "danger"}>
            {isCorrect ? "Correct answer!" : "Incorrect answer!"}
          </Chip>
        )}
        {!gameOver ? (
          <Button
            isDisabled={!selectedAnswer}
            onPress={checkAnswer}
            className="m-4"
            color="primary"
          >
            Check
          </Button>
        ) : (
          <>
            <h2>
              The correct answer was: {answers.find((ans) => ans.correct).text}{" "}
            </h2>
            <Button onPress={restartQuestion} color="primary" className="m-4">
              Restart
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default MainCard;
