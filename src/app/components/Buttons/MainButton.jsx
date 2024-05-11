export default function MainButton({ onClick, prompt }) {
    return (
        <button 
            style={{ 
                width: "75%", 
                height: "48px", 
                outline: "solid", 
                outlineWidth: "thin", 
                borderRadius: 2, 
                background: "#586FB5", 
                color: "white", 
                padding: "0 0 20px 0" 
            }} 
            onClick={onClick}
        >
            {prompt}
        </button>
    );
}
