export default function Item({ difficulty, current, onClick }) {
    return (
        <div style={{
            width: 146, height: 16,
            background: difficulty < 2 ? "#66C61C" : "#F79009",
            outline: current ? "solid" : "none", borderRadius: 30,
            outlineWidth: "thin",
        }} onClick={onClick} />

    )
}