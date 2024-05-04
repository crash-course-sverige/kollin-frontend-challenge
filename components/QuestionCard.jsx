const QuestionCard = ({ question, options, onAnswerSelect }) => {
    return (
        <div>
            <h2>{question}</h2>
            {options.map((option, index) => (
                <button key={index} onClick={() => onAnswerSelect(option)} style={{ display: 'block', margin: '10px 0' }}>
                    {option.text}
                </button>
            ))}
        </div>
    );
};

export default QuestionCard;