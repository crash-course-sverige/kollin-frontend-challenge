import "../Buttons/styles.css";
export default function MainButton({ onClick, prompt, gameOver }) {
  return (
    <button className="MainButton" onClick={onClick} disabled={gameOver}>
      {prompt}
    </button>
  );
}
