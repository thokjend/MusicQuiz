interface InfoTextProps {
  message: string;
  isSuccess: boolean;
}

export function InfoText({ message, isSuccess }: InfoTextProps) {
  return (
    <div className={`info-text ${isSuccess ? "success-text" : "error-text"}`}>
      {message}
    </div>
  );
}
