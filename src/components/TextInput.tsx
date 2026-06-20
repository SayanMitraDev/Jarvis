import { useState, type FormEvent } from 'react';

interface TextInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function TextInput({ onSend, disabled }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form className="text-input" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-input__field"
        placeholder="Type a command or question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" className="text-input__btn" disabled={disabled || !text.trim()}>
        SEND
      </button>
    </form>
  );
}
