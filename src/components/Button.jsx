const Button = ({
  onClick,
  disabled,
  children,

  additionalClasses,
}) => {
  const defaultClasses = "py-3 rounded-lg text-white";
  const enabledClasses = "opacity-90 hover:opacity-100";
  const disabledClasses = disabled
    ? "bg-gray-400 cursor-not-allowed"
    : enabledClasses;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` ${defaultClasses} ${disabledClasses} ${additionalClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
