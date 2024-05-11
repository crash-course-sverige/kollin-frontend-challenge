export default function MainButton({ onClick, prompt }) {
  return (
    <button
      style={{
        width: "59%",
        height: "48px",
        outline: "solid",
        outlineWidth: "thin",
        borderRadius: "8px",
        background: "#586FB5",
        color: "white",
      }}
      onClick={onClick}
    >
      {prompt}
    </button>
  );
}
