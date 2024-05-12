import "../Buttons/styles.css"
export default function MainButton({ onClick, prompt }) {
  return (
    <button className="MainButton"
      onClick={onClick}
    >
      {prompt}
    </button>
  );
}
