interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

export function Button({ onClick, buttonText }: ButtonProps) {
  return <button onClick={onClick}>{buttonText}</button>;
}
