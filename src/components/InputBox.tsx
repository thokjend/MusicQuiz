interface InputBoxProps {
  className: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
}

export function InputBox({
  className,
  type,
  placeholder,
  value,
  onChange,
  icon,
}: InputBoxProps) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {icon && icon !== "none" && <i className={icon}></i>}
    </div>
  );
}
