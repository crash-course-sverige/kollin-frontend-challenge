const CheckButton = ({ onClick }) => {
    return (
        <button onClick={onClick} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', cursor: 'pointer' }}>
            Check Answer
        </button>
    );
};

export default CheckButton;