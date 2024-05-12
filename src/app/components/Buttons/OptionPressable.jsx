import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import "./styles.css"
export default function OptionPressable({ onClick, active, text, gameOver }) {
  return (
    <button
      className="OptionPressable"
      style={{
        outlineColor: active ? "#A8B9EE" : "#E7E5E4",
        backgroundColor: active ? "#E2E8F9" : "white"
      }}
      onClick={onClick}
      disabled={gameOver}
    >
      <Latex>{text}</Latex>
    </button>
  );
}
