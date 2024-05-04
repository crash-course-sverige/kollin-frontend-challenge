const Button = ({ text, onClick, styling = '', disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={`p-3 bg-[#586FB5] text-light rounded-lg enabled:hover:bg-[#586FB5]/90 disabled:bg-[#586FB5]/60 ${styling}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
