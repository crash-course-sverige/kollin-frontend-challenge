export default function GameOverModal({ onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#586FB5",
        color: "white",
        display: "flex",
        flexDirection: "column",
        zIndex: 999,
        borderRadius:20,
        height:"30%",
        width:"30%",
        justifyContent:"center",
        alignItems:"center",
        gap:20
      }}
    >
      <div className="modal-content">
        <h2>Game Over!</h2>
        <p>You have run out of lives.</p>
        <button onClick={onClose} style={{background:"white", color:"black", borderRadius:5, width: "50%"}}>Try Again?</button>
      </div>
    </div>
  );
}
