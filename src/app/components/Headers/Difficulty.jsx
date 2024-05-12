export default function Difficulty({ color, difficultyScore }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span>Difficulty:</span>
      <div
        style={{
          borderRadius: 50,
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: color ? color : "transparent",
        }}
      >
        <span style={{ color: "white" }}>{difficultyScore}</span>
      </div>
    </div>
  );
}
