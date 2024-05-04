const HeartScore = ({ score }) => {
    return (
        <div style={{ color: 'red' }}>
            {'❤️'.repeat(score)}
        </div>
    );
};
export default HeartScore;