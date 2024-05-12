export default function ProgressBar({
  totalItems,
  current,
  onClick,
  correct,
  attempted,
  first,
  gameOver,
}) {
  const progressBarWidth = 143;
  const itemWidth = progressBarWidth / totalItems;

  return (
    <div
      style={{
        width: `${itemWidth}%`,
        height: 16,
        background: attempted ? (correct ? "#66C61C" : "#F79009") : "#D7D3D0",
        outline: current || first ? "solid" : "none",
        borderRadius: 30,
        outlineWidth: 3,
        outlineColor: current ? "#2F80ED" : "none",
        outlineOffset: 2,
      }}
      onClick={onClick}
      disabled={gameOver}
    />
  );
}
