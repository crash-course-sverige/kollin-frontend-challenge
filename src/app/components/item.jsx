export default function Item({ difficulty, current, onClick, correct, attempted }) {
    return (
        <div style={{
            width: 146, height: 16,
            background: attempted ? correct? "#66C61C" : "#F79009": "#D7D3D0",
            outline: current ? "solid" : "none", borderRadius: 30,
            outlineWidth: "thin",
        }} onClick={onClick} />

    )
}