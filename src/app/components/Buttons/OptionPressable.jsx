export default function OptionPressable({ onClick, active, text }) {
    return (

        <button style={{
            width: "100%",
            height: 56,
            outline: "solid",
            outlineWidth: 2,
            borderRadius: 8,
            outlineColor: active ? "#A8B9EE" : "#E7E5E4",
            background: active ? "#E2E8F9":"white"
        }}
            onClick={onClick}>
            {text}
        </button>
    )
}