import { useEffect, useState } from 'react';
import { getFlagExplanation, flags } from '../config/flags';

interface LearningPanelProps {
  lastCommand: string;
}

export function LearningPanel({ lastCommand }: LearningPanelProps) {
  const [foundFlags, setFoundFlags] = useState(getFlagExplanation(lastCommand));

  useEffect(() => {
    setFoundFlags(getFlagExplanation(lastCommand));
  }, [lastCommand]);

  if (!lastCommand.trim()) {
    return (
      <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-4 text-sm">
        <h3 className="text-hacker-green font-bold mb-2">💡 Panel de Aprendizaje</h3>
        <p className="text-gray-400">Escribe un comando Nmap para ver su explicación aquí.</p>
      </div>
    );
  }

  return (
    <div className="bg-hacker-darker border border-hacker-green/30 rounded-lg p-4 text-sm">
      <h3 className="text-hacker-green font-bold mb-3">💡 Panel de Aprendizaje</h3>
      
      <div className="mb-3">
        <p className="text-gray-300 font-mono text-xs mb-1">Comando:</p>
        <p className="text-hacker-green font-mono break-all">{lastCommand}</p>
      </div>

      {foundFlags.length > 0 ? (
        <div className="space-y-3">
          {foundFlags.map((flag, idx) => (
            <div key={idx} className="border-l-2 border-hacker-green pl-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-hacker-green font-mono font-bold">{flag.flag}</span>
                <span className="text-gray-300 text-xs">- {flag.name}</span>
              </div>
              <p className="text-gray-400 text-xs">{flag.description}</p>
              {flag.example && (
                <p className="text-gray-500 text-xs mt-1 font-mono">{flag.example}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-xs">
          <p>No se detectaron flags conocidos en este comando.</p>
          <p className="mt-2">Flags comunes: -sS, -sT, -sU, -sV, -O, -A, -p, -Pn, -F, -v</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-hacker-green/20">
        <p className="text-gray-400 text-xs">
          <strong className="text-hacker-green">💡 Tip:</strong> Usa <code className="text-hacker-green">-v</code> para modo verboso y más información durante el escaneo.
        </p>
      </div>
    </div>
  );
}

