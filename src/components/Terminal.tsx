import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onCommand: (command: string) => void;
  output?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function Terminal({ 
  onCommand, 
  output, 
  error, 
  hint, 
  disabled = false,
  placeholder = 'Escribe un comando Nmap...'
}: TerminalProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg overflow-hidden font-mono">
      <div className="bg-hacker-green/10 px-4 py-2 border-b border-hacker-green/30 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-gray-400">Terminal</span>
      </div>
      
      <div 
        ref={outputRef}
        className="p-4 h-64 overflow-y-auto text-xs"
        style={{ maxHeight: '16rem' }}
      >
        {output && (
          <div className="text-hacker-green whitespace-pre-wrap mb-2">{output}</div>
        )}
        {error && (
          <div className="text-red-400 mb-2">
            <span className="text-red-500">Error:</span> {error}
          </div>
        )}
        {hint && (
          <div className="text-yellow-400 mb-2">
            <span className="text-yellow-500">💡 Pista:</span> {hint}
          </div>
        )}
        {!output && !error && !hint && (
          <div className="text-gray-500">
            Escribe un comando Nmap y presiona Enter...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-hacker-green/30">
        <div className="flex items-center px-4 py-2">
          <span className="text-hacker-green mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-hacker-green outline-none disabled:opacity-50"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}

