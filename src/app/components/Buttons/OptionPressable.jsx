export default function OptionPressable({ onClick, active, text }) {
    return (

        <button style={{
            width: "100%",
            height: 56,
            outline: "solid",
            outlineWidth: "thin",
            borderRadius: 2,
            outlineColor: active ? "ActiveBorder" : "#E7E5E4"
        }}
            onClick={onClick}>
            {text}
        </button>
    )
}