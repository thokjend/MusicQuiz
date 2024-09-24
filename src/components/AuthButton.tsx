interface AuthButtonProps {
  disabled: boolean;
  onClick: () => void;
  buttonText: string;
  isActive: boolean;
}
export function AuthButton({
  disabled,
  onClick,
  buttonText,
  isActive,
}: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={isActive ? "active-button" : ""}
    >
      {buttonText}
    </button>
  );
}
