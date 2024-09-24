interface InputBoxProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
}

export function InputBox({
  type,
  placeholder,
  value,
  onChange,
  icon,
}: InputBoxProps) {
  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i className={icon}></i>
    </div>
  );
}
